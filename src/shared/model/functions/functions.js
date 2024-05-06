export const convertPopulation = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const ucFirst = (str) => {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

export const showContent = (status, error, content) => {
  if (status === 'loading') {
    return <p>Loading...</p>
  } else if (status === 'succeeded') {
    return content
  } else if (status === 'failed') {
    return <p>{error}</p>
  }
}