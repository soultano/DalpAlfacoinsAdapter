import request from 'superagent';
import {extractEntityName, extractMethod} from '../queryHelpers';

const secretKey = 'c4ca4238a0b923820dcc509a6f75849b';
const password = 'C81E728D9D4C2F636F067F89CC14862C';

function postOrder({amount, description}) {
	return request
		.post('https://www.alfacoins.com/api/create')
		.send({
			amount,
			description,
			secret_key: secretKey,
			password,
			type: 'bitcoin',
			options: {
				"notificationURL": "https://www.alfacoinshop.com/notification.php",
				"redirectURL": "https://www.alfacoinshop.com/my/orders/success",
				"payerName": "Anonymous",
				"payerEmail": "no_reply@anonymous.com",
				test: 1,
				status: 'completed',
			}
		})
		.then(function(res) {
			alert('yay got ' + JSON.stringify(res.body));
		});
}

export default class DalpAlfacoinsAdapter {

	executeQuery(dalpQuery) {
		const method = extractMethod(dalpQuery);
		const entityName = extractEntityName(dalpQuery);

		if (method === 'create' && entityName === 'order') {
			return postOrder(dalpQuery.data);
		}

		throw new Error('Not implemented yet');
	}

}