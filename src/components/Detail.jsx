import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Contextpage from "../Contextpage";
import { HiChevronLeft } from "react-icons/hi";
import noimage from "../assets/images/movies.jpg";
import { FaPlay } from "react-icons/fa";
import { IoTicketSharp } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import slugify from "react-slugify";
import "../components/details.css"
export const Detail = () => {
  const APIKEY = "1cf50e6248dc270629e802686245c2c8";
  const navigate = useNavigate();
  const { loader, setLoader } = useContext(Contextpage);

  const { id } = useParams();

  const [moviedet, setMoviedet] = useState([]);
  const [castdata, setCastdata] = useState([]);
  const [moviegenres, setMoviegenres] = useState([]);
  const [video, setVideo] = useState([]);
  const [Booking, setBooking] = useState(true);
  const [arr, setArr] = useState(Array(160).fill(null));
  const [Tickets, setTickets] = useState(0);
  const [TicketsBool, setTicketsBool] = useState(false);
  const [BookedTickets, setBookedTickets] = useState(0);
  const [randomNumber, setRandom] = useState(Math.floor(Math.random() * 5) + 1);
 
  const [count, setCount] = useState([...arr]);
  const [turn, setTurn] = useState(true);

  var arr1 = [...count];

 useEffect(() => {
   const randomArray = Array.from(
     { length: 30 },
     () => Math.floor(Math.random() * 100) + 1
   );
    setArr(arr.map((e, i) => (randomArray.includes(i) ? "#F82032" : null))); 
    setCount(arr.map((e, i) => (randomArray.includes(i) ? "#F82032" : null))); 
 }, []);
  
  // const paymemt = (moviedet) => {
  //   const existingData = localStorage.getItem("booked_movies");
  //   let dataArray = existingData ? JSON.parse(existingData) : [];
    
  //   dataArray.push(moviedet);

  //   const updatedData = JSON.stringify(dataArray);

  //   localStorage.setItem("booked_movies", updatedData);

  //   if (BookedTickets !== 0) {
  //     alert("Payment Successful");
  //     navigate("/");
  //   } else {
  //     alert("Please Select Seats for Payment");
  //   }
  // };
  // const randomNumber = ;
  const payment = (moviedet) => {
    const existingData = localStorage.getItem("booked_movies");
    let dataArray = existingData ? JSON.parse(existingData) : [];

    moviedet.BookedTickets = BookedTickets;

    dataArray.push(moviedet);

    const updatedData = JSON.stringify(dataArray);

    localStorage.setItem("booked_movies", updatedData);

    if (BookedTickets !== 0) {
      alert("Payment Successful");
      navigate("/booked");
    } else {
      alert("Please Select Seats for Payment");
    }
  };

  const handleClick = (i) => {
   
    if (Tickets > 0 && arr[i] === null) { 
       if (arr[i] === null) {
         arr[i] = "#7CFF01";
         setBookedTickets(BookedTickets + 1);
         setTickets(Tickets - 1);
      }
    }else if (TicketsBool) {
     if (arr[i] == "#7CFF01") {
       arr[i] = null;
       setBookedTickets(BookedTickets - 1);
       setTickets(Tickets + 1);
     } 
    }
    console.log(arr[i])
    
    setCount(arr);
    setTurn(!turn);
  };

  const fetchMovie = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=en-US`
    );
    const moviedetail = await data.json();
    setMoviedet(moviedetail);
    // console.log(moviedetail);
    setMoviegenres(moviedetail.genres);
    setLoader(false);
  };

  const fetchCast = async () => {
    const castdata = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${APIKEY}&language`
    );
    const castdetail = await castdata.json();
    setCastdata(castdetail.cast);
    setLoader(false);
  };

  const fetchVideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${APIKEY}&language=en-US`
    );
    const videodata = await data.json();
    setVideo(videodata.results);
    // console.log(videodata.results);
  };
  useEffect(() => {
    fetchMovie();
    fetchCast();
    fetchVideo();
  }, []);

  return (
    <>
      {loader ? (
        <div className="h-screen w-full flex justify-center items-center">
          <span className="loader m-10"></span>
        </div>
      ) : (
        <>
          <Link
            to="/"
            className="fixed z-10 text-4xl text-black bg-white m-3 md:m-5 rounded-full"
          >
            <HiChevronLeft />
          </Link>

          {/* poster */}
          <div className="relative h-auto md:h-[82vh] flex justify-center">
            <div className="h-full w-full shadowbackdrop absolute"></div>
            <h1 className="text-white absolute bottom-0 p-10 text-2xl md:text-6xl font-bold text-center">
              {moviedet.title}
            </h1>
            {moviedet.backdrop_path === null ? (
              <img src={noimage} className="h-full w-full" />
            ) : (
              <img
                src={
                  "https://image.tmdb.org/t/p/original/" +
                  moviedet.backdrop_path
                }
                className="h-full w-full"
              />
            )}
          </div>

          {/* overview */}
          <h2 className="text-white text-center pt-5 px-3 md:px-60 font-Roboto text-[18px]">
            {moviedet.overview}
          </h2>

          <div className="text-blue-100 font-semibold my-3 flex justify-center">
            <h2 className="bg-blue-600/30 border-2 border-blue-700 py-2 px-3 rounded-full">
              Release Date : {moviedet.release_date}
            </h2>
          </div>

          {/* tag */}
          <div className="flex justify-center flex-wrap">
            {moviegenres.map((tag) => (
              <>
                <div
                  key={tag.id}
                  className="text-white font-semibold bg-gray-800 rounded-full px-4 py-1 m-2"
                >
                  {tag.name}
                </div>
              </>
            ))}
          </div>

          {/* cast */}
          <div className="flex flex-col items-center">
            <h1 className="text-3xl text-blue-300 font-semibold text-center p-2">
              Cast
            </h1>

            <div
              className="md:px-5 flex flex-row my-5 max-w-full flex-start overflow-x-auto relative
              scrollbar-thin scrollbar-thumb-gray-500/20 scrollbar-track-gray-900/90 md:pb-3"
            >
              {castdata.map((cast) => (
                <>
                  {cast.profile_path !== null ? (
                    <>
                      <div className="flex min-w-[9rem] md:min-w-[10rem] max-w-[9rem] md:max-w-[10rem] h-full items-center text-center flex-col mx-1">
                        <LazyLoadImage
                          effect="blur"
                          src={
                            "https://image.tmdb.org/t/p/w500" +
                            cast.profile_path
                          }
                          className="w-full h-full rounded-xl"
                        />
                        <p className="text-white">{cast.name}</p>
                        <p className="text-blue-300">({cast.character})</p>
                      </div>
                    </>
                  ) : null}
                </>
              ))}
            </div>
          </div>

          {/* trailer */}
          <div className="flex justify-center items-center mb-10 gap-5 flex-wrap">
            {Array.from(video)
              .filter((trail) => trail.type === "Trailer")
              .map((trail, index) => (
                <>
                  <>
                    <a
                      key={trail.id}
                      href={"https://www.youtube.com/watch?v=" + trail.key}
                      target="_blank"
                      className="flex border-2 border-red-600 bg-red-600/40 p-3 items-center justify-center gap-2 text-xl font-semibold rounded-full text-white"
                    >
                      <FaPlay />
                      Watch trailer{" "}
                      {Array.from(video).filter(
                        (trail) => trail.type === "Trailer"
                      ).length > 1
                        ? index + 1
                        : ""}
                    </a>
                  </>
                </>
              ))}
          </div>

          {/* watch movie */}
          {Booking ? (
            <div className="flex justify-center items-center mb-10 gap-5 flex-wrap">
              <button
                onClick={() => {
                  setBooking(!Booking);
                  // setTicketsBool(!TicketsBool);
                }}
                className="flex border-2 border-green-600 bg-green-600/40 p-3 items-center justify-center gap-2 text-xl font-semibold rounded-full text-white"
              >
                <IoTicketSharp />
                Book Tickets
              </button>
            </div>
          ) : (
            <div>
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "2%",
                }}
              >
                <select
                  onChange={(e) => {
                    setTickets(parseInt(e.target.value));
                    setTicketsBool(true);
                  }}
                  style={{ width: "70%" }}
                >
                  <option value="">Book Tickets</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                </select>
              </div>
            </div>
          )}

          {TicketsBool ? (
            <div>
              {randomNumber === 1 && (
                <h1
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginBottom: "2%",
                  }}
                >
                  Tickets Price :- ₹199
                </h1>
              )}
              {randomNumber === 2 && (
                <h1
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginBottom: "2%",
                  }}
                >
                  Tickets Price :- ₹299
                </h1>
              )}
              {randomNumber === 3 && (
                <h1
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginBottom: "2%",
                  }}
                >
                  Tickets Price :- ₹399
                </h1>
              )}
              {randomNumber === 4 && (
                <h1
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginBottom: "2%",
                  }}
                >
                  Tickets Price :- ₹499
                </h1>
              )}
              {randomNumber === 5 && (
                <h1
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginBottom: "2%",
                  }}
                >
                  Tickets Price :- ₹599
                </h1>
              )}
              <div id="div1">
                <div id="div2">
                  {count.map((c, i) => (
                    <div
                      style={{
                        border: "2px solid #0AEAF1",
                        width: "30px",
                        height: "30px",
                        margin: "5px",
                        color: "#0AEAF1",
                        backgroundColor: c,
                      }}
                      id="div3"
                      onClick={() => {
                        handleClick(i);
                      }}
                      key={i}
                    ></div>
                  ))}
                </div>
              </div>
              <img
                style={{
                  marginLeft: "40%",
                  marginRight: "40%",
                  marginBottom: "5%",
                }}
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjr5-BKPpN8CUa3DslnwnDNqnE-A8-2I3pT-iNMttBdgTQd_eRLC5DElMPWvrKDJw-ke-2kUEGKpGIMTdlI9uq7CtgipB5RY50WyADFN6hsk46lprI71GhWqszqZ3G4MVdnql5eOsW6esxZNWfSzkjJ1u9OkPdp329y47BkbM0t2l29_mZ_2FymMmdq_XUh/s320/tv.png"
                alt="tv"
              />
              {BookedTickets !== 0 && (
                <div className="flex justify-center items-center mb-10 gap-5 flex-wrap">
                  <button
                    onClick={() => {
                      payment(moviedet);
                    }}
                    className="flex border-2 border-green-600 bg-green-600/40 p-3 items-center justify-center gap-2 text-xl font-semibold rounded-full text-white"
                  >
                    <IoTicketSharp />
                    {randomNumber === 1 && `Pay ₹ ${BookedTickets * 199} Now`}
                    {randomNumber === 2 && `Pay ₹ ${BookedTickets * 299} Now`}
                    {randomNumber === 3 && `Pay ₹ ${BookedTickets * 399} Now`}
                    {randomNumber === 4 && `Pay ₹ ${BookedTickets * 499} Now`}
                    {randomNumber === 5 && `Pay ₹ ${BookedTickets * 599} Now`}
                  </button>
                </div>
              )}
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

{
  /* <div>
 <div id="div1">
                <div id="div2">
                  {count.map((c, i) => (
                    <div
                      style={{
                        border: "2px solid #0AEAF1",
                        width: "30px",
                        height: "30px",
                        margin: "5px",
                        color: "#0AEAF1",
                        backgroundColor: c,
                      }}
                      id="div3"
                      onClick={() => handleClick(i)}
                      key={i}
                    ></div>
                  ))}
                </div>
              </div>
              <img
                style={{
                  marginLeft: "40%",
                  marginRight: "40%",
                  marginBottom: "5%",
                }}
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjr5-BKPpN8CUa3DslnwnDNqnE-A8-2I3pT-iNMttBdgTQd_eRLC5DElMPWvrKDJw-ke-2kUEGKpGIMTdlI9uq7CtgipB5RY50WyADFN6hsk46lprI71GhWqszqZ3G4MVdnql5eOsW6esxZNWfSzkjJ1u9OkPdp329y47BkbM0t2l29_mZ_2FymMmdq_XUh/s320/tv.png"
                alt="tv"
              /> 
            </div>
            */
}

             