import React, { useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getSmashystreamUrl, getSuperembedUrl, get2embedUrl } from '../movies'
import { useState } from 'react'
import Contextpage from '../Contextpage'
import { HiChevronLeft } from "react-icons/hi";
import Moviecard from "../components/Moviecard";
import { AnimatePresence, motion } from 'framer-motion';
import { Helmet } from "react-helmet";
import { IoTicketSharp } from 'react-icons/io5'

const Player = () => {
const { loader } = useContext(Contextpage);
  // const existingData = ;
  const navigate = useNavigate();
  const [movies, setMovie] = useState(
    JSON.parse(localStorage.getItem("booked_movies"))
  );
   console.log(movies)
    return (
      <>
        <Helmet>
          <title>Favorite Movies</title>
        </Helmet>
        {movies !== null ? (
          <>
            {" "}
            <button
              onClick={() => history.back()}
              className="fixed z-10 text-4xl text-black bg-white m-3 md:m-5 rounded-full"
            >
              <HiChevronLeft />
            </button>
            <motion.div
              layout
              className="flex flex-wrap relative justify-evenly md:justify-around"
            >
              {movies.map((movie) => (
                <>
                  <Moviecard key={movie.id} movie={movie} />
                  {/* <h1>{movie.BookedTickets}</h1> */}
                </>
              ))}
            </motion.div>{" "}
          </>
        ) : (
          <motion.div
            layout
            className="w-full md:p-2 flex flex-wrap relative justify-evenly md:justify-around"
          >
            <AnimatePresence>
              <div>
                <p className="text-xl text-white mb-4 mt-5">No Booked Tickets</p>
                <div className="flex justify-center items-center gap-5 flex-wrap">
                  <button
                    onClick={() => {
                      navigate("/");
                    }}
                    className="flex border-2 border-green-600 bg-green-600/40 p-3 items-center justify-center gap-2 text-xl font-semibold rounded-full text-white"
                  >
                    <IoTicketSharp />
                    Book Now
                  </button>
                </div>
              </div>
            </AnimatePresence>
          </motion.div>
        )}
      </>
    );
}

export default Player