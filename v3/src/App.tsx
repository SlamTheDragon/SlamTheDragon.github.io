import { useState, useEffect, SetStateAction } from "react";
import { imageFiles } from "./utils/imagesFiles";
import { soundEffectFiles } from "./utils/sfxFiles";
import { videoFiles } from "./utils/videoFiles";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, modalState } from "./components/slice/modal-slices/modalSlice";
import { readHeader } from "./components/slice/modal-slices/modalHeaderSlice";
import { readModalInterface } from "./components/slice/modal-slices/modalInterfaceSlice";
import { focusComponent } from "./utils/focus-element/focusElement";
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
		/***************[ ASSET PRELOADERS ]**************/

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

		// uncomment only if needed

		// Preload images
		images.forEach(preloadImage);

		// Preload sounds
		// sounds.forEach(preloadSound);

		// Preload videos
		// videos.forEach(preloadVideo);


		/***************[ DEVICE CHECKER ]**************/

		function checkDevice() {
			const isMobile = function () {
				let check = false;
				(function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor);
				return check;
			};

			if (isMobile()) {
				console.log(isMobile());
				// return
			} else {
				console.log(isMobile());
				// return
			}
		}


		/***************[ HASH HANDLER ]**************/

		window.onload = () => {
			// focus view
			focusComponent('view')
			// get hash
			const hash = window.location.hash
			// if guard
			if (hash === '') {
				console.log(`no hash detected: stopping jump: hash decode "${hash}"`)
				return;
			}

			window.location.href = hash
		}

		const handleHashChange = () => {
			const hash = window.location.hash
			console.log(hash)

			// this has been triggered twice because buttons call this thing in the first place
			window.location.href = hash
		}

		window.addEventListener('hashchange', handleHashChange)

		return () => {
			window.removeEventListener('hashchange', handleHashChange)
		};

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
