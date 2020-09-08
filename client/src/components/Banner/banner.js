import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import './banner.css';
import {Carousel} from 'antd';

function Banner(props) {
	const {} = props;
	const [images, setImages] = useState([]);
	useEffect(() => {
		Axios({
			method: 'GET',
			url: `https://team11-api.azurewebsites.net/api/banner/getAllBannerForHomePage`,
			headers: {
				Accept: 'application/json',
			},
		})
			.then((res) => {
				// setSchedules(res.data.schedule.reverse());
				setImages(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<Carousel className='banner-carousel' autoplay>
			{images.length > 0 ? (
				images
					.filter((item) => item.isActive === true)
					.slice(0, 3)
					.map((img, index) => {
						return (
							<div key={index}>
								<img
									className='center'
									src={img.bannerImage}
									alt='First slide'
								/>
							</div>
						);
					})
			) : (
				<div>
					<img
						className='center default-banner'
						src='https://image2.tin247.com/pictures/2020/02/21/hmr1582253344.jpg'
						alt='First slide'
					/>
				</div>
			)}
		</Carousel>
	);
}

export default Banner;
