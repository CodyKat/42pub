import React, { useState, useEffect } from 'react';

const ImageContent = () => {
    const [points, setPoints] = useState(10);

    function moveImage() {
        if (points > 0) {
            setPoints(points - 1);
            const result = Math.random() < 0.5 ? "성공" : "실패";
            console.log(result);
            // 이미지 변경
            const imageSrc = result === "성공" ? "img/찬란한-건-항아리.png" : "img/깨진항아리1.png";

            document.getElementById("moving_image").src = imageSrc;
        }
    }

    useEffect(() => {
        const buttonElement = document.getElementById("upgrade_button");
        if (buttonElement) {
            buttonElement.disabled = points <= 0;
        }
    }, [points]);

    return (
        <section className="container mt-5">
            <div className="row">
                <div className="col-md-6 col-lg-6 mb-4">
                    <div className="card h-100">
                        <div className="row">
                            <div className="col-md-6 col-lg-6">
                                <img id="moving_image" className="card-img-top" src="./img/건-항아리.png" alt="Background Image"></img>
                            </div>
                            <div className="col-md-6 col-lg-6">
                                <div className="card-body">
                                    <h5 className="card-title">이미지</h5>
                                    <p className="card-text">이미지 설명</p>
                                    <button onClick={moveImage} className="btn btn-primary position-relative" style={{ zIndex: 3 }} id="upgrade_button">클릭!</button>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">포인트: <span id="point1_1">{points}</span></small>
                                    <small className="text-muted">포인트: <span id="point2_1">10</span></small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ImageContent;
