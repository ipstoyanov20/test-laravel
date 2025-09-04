import { useEffect } from 'react';
import { hubspot, Text } from '@hubspot/ui-extensions';

hubspot.extend(({ context }) => <Hello context={context} />);

const Hello = ({ context }) => {
  useEffect(() => {
    const fetchData = async () => {
      let url = 'https://api.helpcenter.io/articles'; // replace with your own
      const response = await hubspot.fetch(url, {
        timeout: 10,
        method: 'GET',
		headers:{
			Authorization: 'Bearer CiRldTEtMzY4Mi1hNjNlLTRjMzEtOGY0NC1lY2RkMGIyMDE4YjIQwt2BRhjpssYnKhkABeaRgul0aKTsBsPHUSObh8i7sud-XnePSgNldTE'
		}
      });
      console.log('Server response:', response.status);
      try {
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.error('Failed to parse as json', err);
      }
    };
    fetchData().catch((err) => console.error('Something went wrong', err));
  }, []);

  return <Text>Hello world</Text>;
};