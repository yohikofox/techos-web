import fs from 'fs'

const toDataURL = async (url: string): Promise<string> => {
  //TODO: export to server action
  const response = await fetch(url)
  const blob = await response.arrayBuffer()
  const contentType = response.headers.get('content-type');

  const base64String = `data:${contentType};base64,${Buffer.from(
    blob,
  ).toString('base64')}`;

  return base64String
}


export default toDataURL