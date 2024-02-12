import './App.css'
import axios from 'axios'

function App() {
  
  const handleTest  = () => {
      axios.get('http://bab-pool.com/api/test/connection').then((res) => {
        console.log(res);
      }).catch(console.error);
      
  }


  return (
    <>
        <button onClick={handleTest}>버튼</button>
    </>
  )
}

export default App
