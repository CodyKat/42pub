import { useState } from 'react';

const Navigation = () => {
    const [search, setSearch] = useState('');

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/subjects/search?q=${search}`);
            if (response.ok) {
                const data = await response.json();
                const subjectId = data.subjects[0].id;
    
                // Fetch the PDF file
                const pdfResponse = await fetch(`http://127.0.0.1:5000/api/subjects/pdf/${subjectId}`);
                if (pdfResponse.ok) {
                    const pdfBlob = await pdfResponse.blob();
    
                    // Create a hidden anchor element to download the file
                    const url = window.URL.createObjectURL(pdfBlob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = `${data.subjects[0].name}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                } else {
                    console.error(`Error fetching PDF file: ${pdfResponse.statusText}`);
                    alert('No matching PDF file found');
                }
            } else {
                console.error(`Error fetching subjects: ${response.statusText}`);
                alert('No matching subjects found');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container px-4 px-lg-5">
            <a className="navbar-brand">42_PUB</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                    <li className="nav-item"><a className="nav-link active" aria-current="page" href="/home">Home</a></li>
                    <li className="nav-item"><a className="nav-link" href="/itemshop1">아이탬상점</a></li>
                    <li className="nav-item"><a className="nav-link" href="/itemshop2">항아리 상점</a></li>
                    <li className="nav-item"><a className="nav-link" href="/inventory">인벤토리</a></li>
                </ul>
                <form className="d-flex" onSubmit={handleSearchSubmit}>
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search subject"
                        aria-label="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="btn btn-outline-success" type="submit">
                        Search
                    </button>
                </form>
                <form className="d-flex">
                    <button className="btn btn-outline-dark" type="submit" id="cartButton">
                        <i className="bi-cart-fill me-1"></i>
                        Cart
                        <span className="badge bg-dark text-white ms-1 rounded-pill" id="cartItemCount">10</span>
                    </button>
                </form>
            </div>
        </div>
        </nav>
    );
};

export default Navigation;

