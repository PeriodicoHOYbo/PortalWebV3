'use client'
import React, { useState, useEffect } from "react";


const videoArr = [
  "1.mp4?alt=media&token=7a326c0d-8a4b-4491-a5c4-ba9f2fc96b4c",
  "2.mp4?alt=media&token=6481f125-d945-4d2f-8baa-4005808bbc37",
  "3.mp4?alt=media&token=1d36d0e2-2356-4c4f-aceb-1e9399e77382",
  "4.mp4?alt=media&token=b85e27c0-dc9f-41f4-9d13-d25ed810b520",
  "5.mp4?alt=media&token=cf5aacb1-33ca-402d-a06f-fb4e4d65aa20",
  "6.mp4?alt=media&token=7d3fb5bc-c64f-4e81-9335-7784ec3e0ea7",
  "7.mp4?alt=media&token=3070c58f-c058-4d1a-b0ea-8db75c7f945a",
  "8.mp4?alt=media&token=2d374cae-e0f0-4334-8b85-1806ac3ce9be",
  "9.mp4?alt=media&token=b8bb5a65-a550-47a6-8304-62083701325f",
  "10.mp4?alt=media&token=642d4f86-b1e1-46c2-8f15-dda00816f323",
  "11.mp4?alt=media&token=5b16846c-4487-4b5b-9158-dab7e5dc54c1",
  "12.mp4?alt=media&token=becb031c-ea2a-46ca-84af-bfed6ac1f221",
  "13.mp4?alt=media&token=0bb8f1b2-1108-4dc9-a408-bbfc31a67047",
  "14.mp4?alt=media&token=4021554c-924b-4bca-81c5-1ddb870a3436",
  "15.mp4?alt=media&token=2acdccc7-2166-47a6-afc1-fa846055d49c",
  "16.mp4?alt=media&token=9d74440f-aa7e-40ca-b1b3-14c2d004de7f",
  "17.mp4?alt=media&token=10ac148c-fe79-4a2d-9c8d-82d4924cd3dc",
  "18.mp4?alt=media&token=595ce43a-aa7a-448c-aa6d-a8a99cc40782",
  "19.mp4?alt=media&token=557fbc0a-73e8-4284-aad4-5bf25df5e3a3",
  "20.mp4?alt=media&token=076e3fc3-cbf5-42de-93a2-ff4cc233b1c1",
  "21.mp4?alt=media&token=3b5b56c8-6be7-41de-bb8e-918f0b0d4e14",
  "22.mp4?alt=media&token=4eaadd83-657c-4b74-9ceb-1a8dafd700ae",
  "23.mp4?alt=media&token=5e0e564b-a3a8-418e-82b5-878036c28b16",
  "24.mp4?alt=media&token=007772d4-05e2-4f37-bdac-15ac696d068b",
  "25.mp4?alt=media&token=1703a060-4e52-40c5-b52c-5ffb20c3a53d",
  "26.mp4?alt=media&token=736c91a2-c676-4db1-80a5-8470ca47a901",
  "27.mp4?alt=media&token=afc54c0b-d2ee-418e-833f-4e2f53546a22",
  "28.mp4?alt=media&token=2b3d04b3-761a-472b-8e6a-b5167c8b4445",
  "29.mp4?alt=media&token=bdab9120-9669-4be5-9d23-7b19e0811f5b",
  "30.mp4?alt=media&token=10cccd76-7f91-4189-8d78-59d99da3b59b",
  "31.mp4?alt=media&token=e9140a63-ae94-4d3c-9008-8b8a053cbc9a",
  "32.mp4?alt=media&token=9a920e9f-3ea7-46e4-88ec-b3c4120386cb",
  "33.mp4?alt=media&token=52981a3a-b614-4293-a9e6-bef42adad971",
  "34.mp4?alt=media&token=4a3b0229-a28f-49e4-822d-12c243fea7ec",
  "35.mp4?alt=media&token=9f97826b-b982-421f-8255-d88e0fe84caf",
  "36.mp4?alt=media&token=2df5cd4f-2ea3-4926-8ba1-c8f8e4bfab9d",
  "37.mp4?alt=media&token=03228690-b5f8-46bc-a8e2-23674dd103d5",
  "38.mp4?alt=media&token=30e14b13-27ba-4dab-9a4d-bcdfbcb0729b",
  "39.mp4?alt=media&token=6303aaca-5996-46f0-bb9a-7f5a32da14eb",
  "40.mp4?alt=media&token=39d841fa-a100-4830-b2ee-844eea018f98",
  "41.mp4?alt=media&token=cc96ae3e-fe9c-4e23-8ff4-8e695a05b478",
  "42.mp4?alt=media&token=d4fde9fb-3e36-46c2-992e-4599eeddebb2",
  "43.mp4?alt=media&token=32af6e1d-0767-4873-95a4-7fa905d8feba",
  "44.mp4?alt=media&token=6681d1bd-5cd0-4c63-8cd4-339d608a98c8",
  "45.mp4?alt=media&token=8c778cfc-95d3-4e47-9bd7-f4d111259644",
  "46.mp4?alt=media&token=298c5ffe-664a-488d-a9ca-cdeedaf54cfd",
  "47.mp4?alt=media&token=4f57b7ee-f24d-4554-aa4d-0306a3acd241",
  "48.mp4?alt=media&token=0ebb66c5-a1d6-4b82-b240-5855bfa11448",
  "49.mp4?alt=media&token=097cc0e3-f274-45e5-bcd6-872eb6de979e",
  "50.mp4?alt=media&token=2eba56ba-c814-4e61-a39d-4e2bde6c7b47",
  "51.mp4?alt=media&token=64756a8f-b01b-479b-9132-ee411297408f",
  "52.mp4?alt=media&token=1519c62d-f79b-4d89-b977-0d9f61380b42",
  "53.mp4?alt=media&token=12c252b6-d292-4566-8371-a89274f247e5",
  "54.mp4?alt=media&token=25d70ed9-ad40-4ed0-8061-f0f5e00a036b",
  "55.mp4?alt=media&token=74b1489b-a1a4-4f33-9087-6256b21d6022",
  "56.mp4?alt=media&token=f4750dd9-5c93-4d07-bc0c-7398aea19cbe",
  "57.mp4?alt=media&token=4cd0c2a1-9cfe-4885-9aa3-f08061d3105c",
  "58.mp4?alt=media&token=3bd73bb7-3cc5-472b-996d-b94a20cf2f53",
  "59.mp4?alt=media&token=7f0d96aa-d046-40fb-a384-87fe4fb2556a",
  "60.mp4?alt=media&token=7ce630da-3415-45ef-94c9-7647628ccdff",
  "61.mp4?alt=media&token=9263aa50-1d5a-4b09-86fc-26e1058aaf76",
  "62.mp4?alt=media&token=f0137aab-bdbe-47fa-9b46-f7a04dfed290",
  "63.mp4?alt=media&token=e3b9fbdf-0b9d-4c14-b771-62fda15d8e18",
  "64.mp4?alt=media&token=ad5cd4c4-a3d7-4871-afac-36f2327235d8",
  "65.mp4?alt=media&token=01fe1ef6-6dc2-4360-a606-640c50e5afc7",
  "66.mp4?alt=media&token=4620af57-916a-45fd-8d5c-7cf12c9d3574",
  "67.mp4?alt=media&token=85c1cc29-2595-4741-8cbe-fdf06c12dfc5",
  "68.mp4?alt=media&token=75ec9f10-d99d-4e21-99c7-be2be1f497e7",
  "69.mp4?alt=media&token=f0723ba5-cc59-472d-bbe7-4a11dc5710b8",
  "70.mp4?alt=media&token=1dfca925-810b-41c3-8dcd-cc9f457939fa",
  "71.mp4?alt=media&token=53292811-b4af-402c-ac18-b11d160123fb",
  "72.mp4?alt=media&token=a26bc23a-5c42-4e87-92af-00f9c191a44c",
  "73.mp4?alt=media&token=66bd47e0-a886-4ce3-a0fa-e327f0e209de",
  "74.mp4?alt=media&token=efffa181-7c50-42c3-a5aa-33c65fadb2ce",
  "75.mp4?alt=media&token=d284a030-3e57-4b59-9667-e6f9041446f2",
  "76.mp4?alt=media&token=274e3626-6368-4433-8f13-3a30992fdedf",
  "77.mp4?alt=media&token=f543bbb8-aacf-48e1-b6c5-4233e466e6d8",
  "78.mp4?alt=media&token=7f5c7f98-9805-4d4a-89c1-82ab0261b9f3",
  "79.mp4?alt=media&token=0b3efc24-4f79-405b-9e15-b03be1d7412d",
  "80.mp4?alt=media&token=66d80850-7901-4e05-bf08-5b5fb087cfd2",
  "81.mp4?alt=media&token=023e0693-d52e-4446-9d9a-393b108c5397",
  "82.mp4?alt=media&token=a0517184-7bef-4b0a-a55f-f6d6bfb81371",
  "83.mp4?alt=media&token=671db20d-7fca-4bb0-b29f-281a376b347f",
  "84.mp4?alt=media&token=b7238c78-ec29-4ed6-8c1b-95dcf606311d",
  "85.mp4?alt=media&token=badf97b9-00e4-4bcc-9686-225860270ee1",
  "86.mp4?alt=media&token=c8edea8a-23be-4ef6-8786-fb78417e4cdd",
  "87.mp4?alt=media&token=a2909565-5748-43ff-9309-be644c8d66cd",
  "88.mp4?alt=media&token=9f99182b-9bdb-4661-86c6-713fe002d3bc",
  "89.mp4?alt=media&token=ac127da6-dd09-48a9-b4cb-01eda915a94b",
  "90.mp4?alt=media&token=f7b6ec46-20b4-476e-bcf2-db3f652e7ecf",
  "91.mp4?alt=media&token=8d79b1e9-b49a-46cd-a638-0c62d4ddbc73",
  "92.mp4?alt=media&token=0cad379a-e38f-4270-9438-3c0d3c954d98",
  "93.mp4?alt=media&token=1ee7370d-43bd-4792-80c5-d840194454a2",
  "94.mp4?alt=media&token=9c06121b-75d6-477c-97c9-8a59df213063",
  "95.mp4?alt=media&token=854e5bc0-ef02-4dfd-8b1d-df4e0fda47c6",
  "96.mp4?alt=media&token=dcd06540-76c4-4da7-bafd-4dd06de44b0e",
  "97.mp4?alt=media&token=264df68c-a69a-4031-8d11-862ac3813256",
  "98.mp4?alt=media&token=287ed6cd-b972-44f6-8b5e-d9505b2846a0"
]




const VideoPlayer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentVideos, setCurrentVideos] = useState([]);
  const videosPerPage = 2; // Número de videos por página
  const maxPageNumbersToShow = 5; // Máximo de números de página a mostrar

  // Total de páginas
  const totalPages = Math.ceil(videoArr.length / videosPerPage);

  // Actualiza los videos de la página actual cuando `currentPage` cambia
  useEffect(() => {
    const startIndex = (currentPage - 1) * videosPerPage;
    const endIndex = currentPage * videosPerPage;
    const videosToDisplay = videoArr.slice(startIndex, endIndex);
    
    console.log("Videos a mostrar para la página", currentPage, videosToDisplay); // Agrega esto para depuración

    setCurrentVideos(videosToDisplay);
  }, [currentPage]);  // Reacciona solo al cambio de `currentPage`

  // Cambiar de página
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Calcular el rango de páginas visibles
  const calculatePageNumbers = () => {
    const halfRange = Math.floor(maxPageNumbersToShow / 2);
    let startPage = Math.max(currentPage - halfRange, 1);
    let endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages);

    if (endPage - startPage + 1 < maxPageNumbersToShow) {
      startPage = Math.max(endPage - maxPageNumbersToShow + 1, 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Contenedor de videos */}
      <div className="grid gap-4 md:grid-cols-2">
        {currentVideos.map((video, index) => (
          <video controls width="320" key={video}>
            <source
              src={`https://firebasestorage.googleapis.com/v0/b/varios-ae38b.appspot.com/o/${video}`}
              type="video/mp4"
            />
            Tu navegador no soporta la reproducción de videos.
          </video>
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Anterior
        </button>
        {calculatePageNumbers().map((page) => (
          <button
            key={page}
            className={`px-4 py-2 rounded ${
              currentPage === page
                ? "bg-[#00404af3] text-white"
                : "bg-gray-300 text-black"
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
