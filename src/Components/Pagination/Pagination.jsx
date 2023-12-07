import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../Context/globalContext.jsx";
import Card from "../Card/Card.jsx";
import './pagination.css';

function Pagination({ instrumentos, isLoading, instrumentosFilter, instrumentosReservados, totalinstrumentos }) {
    const instrumentosPerPage = 10;
    const [page, setPage] = useState(1);
    const [favouritesList, setFavouritesList] = useState([])
    const token = localStorage.getItem("token");
    const users = JSON.parse(localStorage.getItem("usersData"));
    const usersId = users ? users.id : null;


    const fetchDatashow = async () => {
        try {
            const url = `http://localhost:8090/users/mostrarFav/${usersId}`;
            const set = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await fetch(url, set);
            const data = await response.json();

            if (response.ok) {
                setFavouritesList(data);
                console.log(data)
            } else {
                throw new Error("Error");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const updateListaFav = () => {
        fetchDatashow()
    }

    useEffect(() => {
        if (usersId) {
            fetchDatashow()
        }
    }, [usersId])

    useEffect(() => {
        renderCards();
    }, [favouritesList])

    const totalPages = Math.ceil(instrumentos.length / instrumentosPerPage);

    const startIndex = (page - 1) * instrumentosPerPage;
    const endIndex = startIndex + instrumentosPerPage;
    const instrumentosSinReserva = instrumentos.filter(instrumento => !instrumentosReservados.includes(instrumento.id))

    let instrumentosSearch = instrumentosSinReserva;

    if (instrumentosFilter.length > 0) {
        instrumentosSearch = instrumentosSinReserva.filter(instrumento => instrumentosFilter.some(filtrado => filtrado.id == instrumento.id))
    } else {
        instrumentosSearch = instrumentosSinReserva;
    }

    const currentItem = instrumentosSearch.slice(startIndex, endIndex);

    const nextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setPage(pageNumber);
        }
    };

    const renderCards = () => {

        return currentItem.map((item) => {
            if (favouritesList.some((favorito) => favorito.id == item.id)) {
                return <Card key={item.id} {...item} isFavorite={true} updateListaFav={updateListaFav} />
            } else {
                return <Card key={item.id} {...item} isFavorite={false} updateListaFav={updateListaFav} />
            }
        }
        );
    };

    const renderPageButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={`btn-siguiente ${i === page ? 'pagina-actual' : ''}`}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div className="listaContainer">
            {isLoading ? <div className="loader"></div> : null}
            <h4 className="cantinstrumentos"></h4>
            <ul className="listaPaginada">{renderCards()}</ul>
            <div className="btn-container">
                <button
                    className="btn-anterior"
                    onClick={prevPage}
                    disabled={page === 1}
                >
                   ⬅️
                </button>
                {renderPageButtons()}
                <button
                    className="btn-siguiente"
                    onClick={nextPage}
                    disabled={page === totalPages}
                >
                    ➡️
                </button>
            </div>
        </div>
    );
}

export default Pagination;
