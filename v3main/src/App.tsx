import { useDispatch, useSelector } from "react-redux"
import { closeModal, modalState } from "./components/slice/modal-slices/modalSlice"
import { readHeader } from "./components/slice/modal-slices/modalHeaderSlice"
import { readModalInterface } from "./components/slice/modal-slices/modalInterfaceSlice"
import { ModalOperation } from "./utils/component-utils/modalOperation"
import { checkDevice } from "./utils/device-checker/checkDevice"
import { Logging } from "./utils/logger"
import Home from "./components/Pages/Home"
import Modal from "./components/common/Modal"
import DefaultModal from "./components/widgets/modal-contents/DefaulModal"
import Sample1 from "./components/widgets/modal-contents/SsampleContentA"
import Sample2 from "./components/widgets/modal-contents/SsampleContentB"
import Sample3 from "./components/widgets/modal-contents/SsampleContentC"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Terms from "./components/Pages/Terms"
import Status from "./components/Pages/Status"
import FourOhFour from "./components/Pages/404"
import Commissions from "./components/Pages/Commissions"
import { DataCache } from "./utils/firebase/datacache"
import { useEffect, useState } from "react"
import { focusComponent } from "./utils/focus-element/focusElement"
import { QueryDecoder } from "./utils/url-query-decoders/queryDecoder"


function App() {
	// # Redux get
	// ...
	const isModalOpen = useSelector(modalState)
	const getHeader = useSelector(readHeader)
	const getInterfaceID = useSelector(readModalInterface)

	// # Redux set
	const dispatch = useDispatch()
	const modalDispatch = ModalOperation()

	const [isLoading, setIsLoading] = useState(true) // use isLoading if you want to hide the interface at start

	// Cache Firebase Data after all assets have been loaded then do other things
	useEffect(() => {
		if (!isLoading) {
			DataCache.fetch()
			QueryDecoder.Set()

			// focus view
			focusComponent('view')
			// get hash
			const hash = window.location.hash
			Logging.DEBUG(`Current hash is '${hash}'`)
			// hash jump guard
			if (hash === '') {
				Logging.VERBOSE(`no hash detected: stopping jump: hash decode "${hash}"`)
				return cleanUp()
			}
			window.location.href = hash
		}
	}, [isLoading])

	useEffect(() => {
		window.addEventListener('hashchange', handleHashChange)

		const change = () => {
			modalDispatch("Something went wrong", 2)
		};
		setIsLoading(false);
		
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
			// modalDispatch('Warning', 1)
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

			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/terms" element={<Terms />} />
					<Route path="/status" element={<Status />} />
					<Route path="/commissions" element={<Commissions />} />
					<Route path="*" element={<FourOhFour />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
