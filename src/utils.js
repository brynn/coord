import axios from 'axios';

export const convertSeconds = secs => {
  const days = Math.floor(secs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((secs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((secs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((secs % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
};

export const getDataFromUrl = async () => {
  try {
    const { data } = await axios.get(
      'https://api.staging.coord.co/codechallenge/commits'
    );
    return data;
  } catch (err) {
    console.log('error reading remote URL');
  }
};

export const calculateTimeofCommit = data => {
  // multiply by 1000 to get milliseconds
  const firstCommit = data[data.length - 1] * 1000;
  const lastCommit = data[0] * 1000;

  // extrapolate time of 2000th commit
  const timeSoFar = lastCommit - firstCommit;
  const commitsSoFar = data.length;
  const commitsUntil2000 = 2000 - commitsSoFar;
  const now = new Date().getTime();
  return now + (commitsUntil2000 / commitsSoFar) * timeSoFar;
};
