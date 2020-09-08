import UpdateClubWithBanner from './UpdateClubWithBanner';
import React from 'react';
import {Fragment} from 'react';

const UpdateClubWithBannerContainer = (props) => {
	const {id, data, history} = props;

	return (
		<Fragment>
			<UpdateClubWithBanner id={id} data={data} history={history} />
		</Fragment>
	);
};

export default UpdateClubWithBannerContainer;
