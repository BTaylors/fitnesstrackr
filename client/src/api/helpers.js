const COHORT_NAME = "2301-FTB-ET-WEB-AM";
const BASE_URL = `fitnesstrac-kr.herokuapp.com/api/${COHORT_NAME}`;

export const getToken = async (token) => {
	try {
		const response = await fetch(`${BASE_URL}/users/me`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};
