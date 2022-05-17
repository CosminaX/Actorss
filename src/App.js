import Actor from "./Actor";
import Footer from "./Footer";
import Header from "./Header"
function App() {

  return (
    <div className="App">
      <Header />
      <Actor
        name="Leonardo Dicaprio"
        score="10"
        hobbies="Music and dancing naked in the rain"
        description="He is a good guy with a thick mustache"

      />
      <Footer />
    </div>
  );
}

export default App;
