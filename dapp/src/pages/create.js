import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import Footer from "../components/Footer";

import { addCampaign, getLastCampaignId } from "../services/Web3Service";

export default function Create() {
  const [campaign, setCampaign] = useState({});
  const [message, setMessage] = useState("");

  function onInputChange(evt) {
    setCampaign((prevState) => ({
      ...prevState,
      [evt.target.id]: evt.target.value,
    }));
  }

  function btnSaveClick() {
    setMessage("Salvando...aguarde...");
    addCampaign(campaign)
      .then((tx) => getLastCampaignId())
      .then((id) =>
        setMessage(
          `Campanha salva com ID <b>${id}</b>. Avise os seus amigos e passe a eles esse número.`
        )
      )
      .catch((err) => {
        console.error(err);
        setMessage(err.message);
      });
  }

  return (
    <>
      <Head>
        <title>Donate Crypto | Criar Campanha</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container">
        <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
          Donate Crypto
        </h1>
        <p>Preencha os campos para incluir sua campanha na plataforma.</p>
        <hr className="mb-4" />
        <div className="col-6">
          <div className="form-floating mb-3">
            <input
              type="text"
              id="title"
              className="form-control"
              value={campaign.title}
              onChange={onInputChange}
            />
            <label for="title">Título:</label>
          </div>
          <div className="form-floating mb-3">
            <textarea
              id="description"
              className="form-control"
              value={campaign.description}
              onChange={onInputChange}
            />
            <label for="description">Descrição:</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              id="imageUrl"
              className="form-control"
              value={campaign.imageUrl}
              onChange={onInputChange}
            />
            <label for="imageUrl">URL da Imagem:</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              id="videoUrl"
              className="form-control"
              value={campaign.videoUrl}
              onChange={onInputChange}
            />
            <label for="videoUrl">URL do Vídeo:</label>
          </div>
        </div>
        <div className="col-6 mb-3">
          <input
            type="button"
            className="btn btn-primary col-12 p-3"
            value="Salvar Campanha"
            onClick={btnSaveClick}
          />
        </div>
        <div className="col-6 mb-3">
          <Link href="/" className="btn btn-secondary col-12 p-3">
            Voltar
          </Link>
        </div>
        {message ? (
          <div className="alert alert-success p-3 col-6" role="alert">
            {message}
          </div>
        ) : (
          <></>
        )}
        <Footer />
      </div>
    </>
  );
}
