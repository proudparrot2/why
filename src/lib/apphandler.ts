export async function fetchApp(url: string) {
  var res = await fetch(`${url}/app.json`)
  const data = await res.json()

  console.log(data)
}