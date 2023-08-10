import { useState, useEffect } from "react";
import { imageFiles } from "./utils/imagesFiles";
import { soundEffectFiles } from "./utils/sfxFiles";
import { videoFiles } from "./utils/videoFiles";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, modalState } from "./components/slice/modal-slices/modalSlice";
import { readHeader } from "./components/slice/modal-slices/modalHeaderSlice";
import { readModalInterface } from "./components/slice/modal-slices/modalInterfaceSlice";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { firebaseConfig } from "./utils/firebase/firebase";
import Interface from "./components/.Interface";
import Modal from "./components/common/Modal";
import DefaultModal from "./components/widgets/modal-contents/DefaulModal";
import Sample1 from "./components/widgets/modal-contents/SsampleContentA";
import Sample2 from "./components/widgets/modal-contents/SsampleContentB";
import Sample3 from "./components/widgets/modal-contents/SsampleContentC";

function App() {
	// You can setup this asset preloaders if needed. Removed if you want all assets to lazy-load
	// Perhaps... Refactor?
	const [isLoading, setIsLoading] = useState(true); // use isLoading if you want to hide the interface at start
	const [totalLoaded, setLoadedAssets] = useState(0);


	useEffect(() => {
		const images = Object.values(imageFiles)
		const sounds = Object.values(soundEffectFiles);
		const videos = Object.values(videoFiles)

		const totalAssets = images.length + sounds.length + videos.length;
		let loadedAssets = 0;

		const assetLoaded = () => {
			loadedAssets++;
			setLoadedAssets(loadedAssets)

			if (loadedAssets === totalAssets) {
				setIsLoading(false); // All assets are loaded
			}
		};

		const preloadImage = (url: string) => {
			const img = new Image();
			img.onload = assetLoaded;
			img.src = url;
		};

		const preloadSound = (url: string) => {
			const audio = new Audio();
			audio.oncanplaythrough = assetLoaded;
			audio.src = url;
		};

		const preloadVideo = (url: string) => {
			const video = document.createElement('video');
			video.oncanplaythrough = assetLoaded;
			video.src = url;
		};

		// Preload images
		images.forEach(preloadImage);

		// Preload sounds
		// sounds.forEach(preloadSound);

		// Preload videos
		// videos.forEach(preloadVideo);
	}, []);


	/***************[ INITIALIZERS ]**************/

	// # Redux get
	// ...
	const isModalOpen = useSelector(modalState)
	const getHeader = useSelector(readHeader)
	const getInterfaceID = useSelector(readModalInterface)

	// # Redux set
	const dispatch = useDispatch()

	
	// # Initialize
	document.addEventListener('keydown', handleEscapeKeyPress);


	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	const analytics = getAnalytics(app);
	// Initialize Cloud Firestore and get a reference to the service
	const db = getFirestore(app);

	// async function a() {
	// 		try {
	// 			const docRef = await addDoc(collection(db, "users"), {
	// 				first: "Ada",
	// 				last: "Lovelace",
	// 				born: 1815
	// 			});
	// 			console.log("Document written with ID: ", docRef.id);
	// 		} catch (e) {
	// 			console.error("Error adding document: ", e);
	// 		}
	// }

	/***************[ SURFACE FUNCTIONS ]**************/
	function handleEscapeKeyPress(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			dispatch(closeModal())
		}
	}


	return (
		<>
			<Modal
				// Hover/Open component source for definition
				//
				// Usage:
				// ... Component() {
				// 		const foo = useModalOperation()
				//
				//		return (
				//				<button onClick={() => foo( modalTitle: string, modalInterfaceID: number }> Open Modal </button>	
				// 		)
				// }

				modalTitle={getHeader}
				isOpen={isModalOpen}
				onClose={() => dispatch(closeModal())}
				selectInterface={getInterfaceID}
				selectAction={0}
			>
				{/* You Can Remove This */}
				<DefaultModal key={0} />

				{/* List All Components */}
				<Sample1 key={1} />
				<Sample2 key={2} />
				<Sample3 key={3} />
			</Modal>
			<Interface />
		</>
	);
}

export default App;
