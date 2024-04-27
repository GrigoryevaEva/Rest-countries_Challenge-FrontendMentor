class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getList() {
    const url = `${this.baseUrl}/all`;
    const response = await fetch(url);

    if (!response.ok) {
      const message = `Api: An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json()
    return data
  }

  async getById(cca3) {
    const url = `${this.baseUrl}/alpha/${cca3}`;
    const response = await fetch(url);

    if (!response.ok) {
      const message = `Api: An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json()
    return data
  }

  async getByName(name) {
    if (!name) return []

    const url = `${this.baseUrl}/name/${name}`;
    const response = await fetch(url);

    if (!response.ok) {
      const message = `Api: An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json()
    return data
  }

  async getListByRegion(region) {
    const url = `${this.baseUrl}/region/${region}`;
    const response = await fetch(url);

    if (!response.ok) {
      const message = `Api: An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json()
    // console.log(data)
    return data
  }

  async getListByBorder (listBorderCountryCode) {
 
    if (!listBorderCountryCode) return ['']

    let data = [];

    for (let id of listBorderCountryCode) {
      let tmp = await this.getById(id)
      let result = tmp.find(() => (true))
      data.push(result)
    }
    
    // console.log(data)
    return data;
  }
}
export default Api;