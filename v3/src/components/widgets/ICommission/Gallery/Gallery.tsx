import { useState, useRef, useEffect } from 'react';
import { ContentBuilder, GalleryBuilder } from '../../../../utils/firebase/contentbuilders';
import GalleryLoader from './GalleryLoader';
import GalleryCard from './GalleryCard';
import style from './gallery.module.scss';


export default function Gallery() {
	const [items, setItems] = useState<any[]>([])
	const [loading, setLoading] = useState(false)
	const loaderRef = useRef<HTMLDivElement | null>(null)

	function loadMoreItems() {
		if (loading) return
		setLoading(true)

		setTimeout(() => {
			const newItems = items.concat(ContentBuilder.galleryLocked)
			setItems(newItems)
			setLoading(false)
		}, 1000)
	}

	function handleObserver(entities: IntersectionObserverEntry[]) {
		const target = entities[0];
		if (target.intersectionRatio >= 1) {
			loadMoreItems()
		}
	}

	useEffect(() => {
		const options = {
			root: null, // Use the viewport as the root
			rootMargin: '0px', // Margin around the root
			threshold: 1, // Partially visible in the viewport triggers callback
		};

		const observer = new IntersectionObserver(handleObserver, options);

		if (loaderRef.current) {
			observer.observe(loaderRef.current);
		}

		// Clean up
		return () => {
			if (loaderRef.current) {
				observer.unobserve(loaderRef.current);
			}
		}
	}, [])


	return (
		<section className={style.gallery} id='gallery'>
			<div className={style.galleryContainer} >
				<div className={style.galleryHeader} tabIndex={0}>
					<h1>Gallery</h1>
				</div>

				<div className={style.galleryBody}>

					<div className={style.galleryRow}>
						{items.map((data, index) => (
							<GalleryCard key={index} {...data} />
						))}
						<div ref={loaderRef}>{loading}</div>
					</div>
					<div className={style.galleryLoadIndicator} style={{ display: loading ? 'flex' : 'none' }}><GalleryLoader/></div>
					<div className={style.galleryLoadIndicator} style={{ display: loading ? 'none' : 'flex' }}>&bull;</div>
				</div>

			</div>
		</section>
	)
}
