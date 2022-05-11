
function App() {
  const actors = {
    name: "Leonardo Dicaprio",
    score: 10,
    hobbies: "Music and dancing naked in the rain",
    description: "He is a good guy with a thick mustache"
  }
  const listItem = Object.keys(actors);
  console.log(listItem);
  return (
    <div className="App">
      {/* Display the object’s information in jsx using <ul> and <li> tags. */}
      <ul>
        <li>{actors.name}</li>
        <li>{actors.score}</li>
        <li>{actors.hobbies}</li>
        <li>{actors.description}</li>
      </ul>
      {/* Display the object’s information in jsx, imagining that you don’t know its properties in advance. */}
      <ul>
        {listItem.map((item, index) => (
          <li key={index}>
            {item}: {actors[item]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
