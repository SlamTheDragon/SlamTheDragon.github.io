import { useState, useRef, useEffect } from 'react';
import style from './gallery.module.scss';

export default function Gallery() {
	const [items, setItems] = useState<number[]>([1, 2, 3]); // Initial items
	const [loading, setLoading] = useState(false);
	const loaderRef = useRef<HTMLDivElement | null>(null);

	const loadMoreItems = () => {
		if (loading) return;
		setLoading(true);

		// Simulate loading new items
		setTimeout(() => {
			const newItems = items.concat([4, 5, 6]); // New items
			setItems(newItems);
			setLoading(false);
		}, 1000);
	};

	const handleObserver = (entities: IntersectionObserverEntry[]) => {
		const target = entities[0];
		if (target.intersectionRatio >= 1) {
			loadMoreItems();
		}
	};

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
		};
	}, []);
	
	
	function bar() {
		const foo = document.getElementById('view')
		foo?.style.setProperty('scroll-snap-type', 'none');
		return null;
	}

	return (
		<section className={style.gallery} id='gallery'>
			<div className={style.galleryContainer}>
				<div>
					<h1>
						Gallery
					</h1>
				</div>
				<div>
					<ul>
						{items.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
					<div style={{ display: loading ? 'flex' : 'none' }}>
						Spinning loading thing
					</div>
					<div style={{ display: loading ? 'none' : 'flex' }}>
						&bull;
					</div>
					<div ref={loaderRef} >
						{loading && bar()}
					</div>

					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
				</div>
			</div>
		</section>
	)
}
