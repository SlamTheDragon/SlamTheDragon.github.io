import { useState, useEffect } from "react"
import { imageFiles } from "./utils/asset-managers/imagesFiles"
import { soundEffectFiles } from "./utils/asset-managers/sfxFiles"
import { videoFiles } from "./utils/asset-managers/videoFiles"
import { useDispatch, useSelector } from "react-redux"
import { closeModal, modalState } from "./components/slice/modal-slices/modalSlice"
import { readHeader } from "./components/slice/modal-slices/modalHeaderSlice"
import { readModalInterface } from "./components/slice/modal-slices/modalInterfaceSlice"
import { focusComponent } from "./utils/focus-element/focusElement"
import { ModalOperation } from "./utils/component-utils/modalOperation"
import { DataCache } from "./utils/firebase/datacache"
import { checkDevice } from "./utils/device-checker/checkDevice"
import { Logging } from "./utils/logger"
import Interface from "./components/.Interface"
import Modal from "./components/common/Modal"
import DefaultModal from "./components/widgets/modal-contents/DefaulModal"
import Sample1 from "./components/widgets/modal-contents/SsampleContentA"
import Sample2 from "./components/widgets/modal-contents/SsampleContentB"
import Sample3 from "./components/widgets/modal-contents/SsampleContentC"


function App() {
	// You can setup this asset preloaders if needed. Removed if you want all assets to lazy-load
	// Perhaps... Refactor?
	const [isLoading, setIsLoading] = useState(true) // use isLoading if you want to hide the interface at start
	const [totalLoaded, setLoadedAssets] = useState(0)
	// const [isOffline, setIsOffline] = useState<boolean>(GetSnapshot.isOffline)

	// # Redux get
	// ...
	const isModalOpen = useSelector(modalState)
	const getHeader = useSelector(readHeader)
	const getInterfaceID = useSelector(readModalInterface)

	// # Redux set
	const dispatch = useDispatch()
	const modalDispatch = ModalOperation()

	// totally messy and redundant code here ngl
	// function forceInitialCacheLock() {
	// 	dispatch(flipCache())
	// }

	// Cache Firebase Data after all assets have been loaded then do other things
	useEffect(() => { 
		if (!isLoading) {
			DataCache.fetch()

			// focus view
			focusComponent('view')
			// get hash
			const hash = window.location.hash
			Logging.DEBUG(`Current hash is '${hash}'`)
			// hash jump guard
			if (hash === '') {
				Logging.VERBOSE(`no hash detected: stopping jump: hash decode "${hash}"`)

				// if (!isLoading) {
				// }
				return cleanUp()
				// Logging.ERROR(`Assets still loading: ${isLoading}`)
			}
			window.location.href = hash
		}
	}, [isLoading])

	useEffect(() => {
		/**
		 * 	FIXME: useEffect resumes and triggers two calls for when the component
		 *  is mounted and unmounted.It is better to move this into a utility file
		 *  to ensure these operations will be triggered once.
		*/

		window.addEventListener('hashchange', handleHashChange)

		/***************[ ASSET PRELOADERS ]**************/

		const images = Object.values(imageFiles)
		const sounds = Object.values(soundEffectFiles)
		const videos = Object.values(videoFiles)

		const totalAssets = images.length + sounds.length + videos.length
		let loadedAssets = 0

		const assetLoaded = () => {
			loadedAssets++
			setLoadedAssets(loadedAssets)

			if (loadedAssets === totalAssets) {
				setIsLoading(false) // All assets are loaded
			}
		}

		const preloadImage = (url: string) => {
			const img = new Image()
			img.onload = assetLoaded
			img.src = url
		}

		const preloadSound = (url: string) => {
			const audio = new Audio()
			audio.oncanplaythrough = assetLoaded
			audio.src = url
		}

		const preloadVideo = (url: string) => {
			const video = document.createElement('video')
			video.oncanplaythrough = assetLoaded
			video.src = url
		}

		// uncomment only if needed

		// Preload images
		images.forEach(preloadImage)

		// Preload sounds
		// sounds.forEach(preloadSound)

		// Preload videos
		// videos.forEach(preloadVideo)


		const change = () => {
			modalDispatch("Something went wrong", 2)
		};

		DataCache.addChangeListener(change)

		return () => {
			window.removeEventListener('hashchange', handleHashChange)
			DataCache.removeChangeListener(change)
		};
	}, [])

	const handleHashChange = () => {
		// Jump on selected hash since we're using a custom interface
		const hash = window.location.hash
		window.location.href = hash
	}

	/***************[ CACHING ]**************/
	function cleanUp() {
		if (checkDevice()) {
			Logging.DEBUG('Device is mobile')
			modalDispatch('Warning', 1)
		}
		if (!checkDevice()) {
			Logging.DEBUG('Device is desktop')
		}

		// in case you forgot
		window.removeEventListener('hashchange', handleHashChange)
	}


	/***************[ INITIALIZERS ]**************/

	// # Initialize
	document.addEventListener('keydown', handleEscapeKeyPress)

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
	)
}

export default App
