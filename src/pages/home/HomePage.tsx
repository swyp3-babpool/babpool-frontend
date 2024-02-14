import axios from 'axios';

export default function HomePage() {
    const handleTest = () => {
        axios
            .get('http://bab-pool.com/api/test/connection')
            .then((res) => {
                console.log(res);
            })
            .catch(console.error);
    };
    return (
        <div>
            <button onClick={handleTest}>버튼</button>
        </div>
    );
}
