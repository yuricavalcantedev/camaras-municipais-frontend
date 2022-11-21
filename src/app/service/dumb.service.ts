import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DumbService {

  constructor() { }

  getParlamentaresMaracanau(){
      return [
        {
            "id": 28,
            "name": "Abias Bezerra",
            "urlImage": "https://sapl.maracanau.ce.leg.br/media/sapl/public/parlamentar/28/abias.jpg",
            "active": true,
            "main": false,
            "politicalParty": "REP"
        },
        {
            "id": 24,
            "name": "Antenor",
            "urlImage": "https://sapl.maracanau.ce.leg.br/media/sapl/public/parlamentar/24/antenor.png",
            "active": true,
            "main": false,
            "politicalParty": "PSDB"
        },
        {
            "id": 12,
            "name": "Berim",
            "urlImage": "https://sapl.maracanau.ce.leg.br/media/sapl/public/parlamentar/12/berim.jpg",
            "active": true,
            "main": true,
            "politicalParty": "MDB"
        },
        {
            "id": 5,
            "name": "Capitão Martins",
            "urlImage": "https://sapl.maracanau.ce.leg.br/media/sapl/public/parlamentar/5/capitao_martins.jpg",
            "active": true,
            "main": true,
            "politicalParty": "PSDB"
        },
        {
            "id": 10,
            "name": "Carlos Alberto",
            "urlImage": "https://sapl.maracanau.ce.leg.br/media/sapl/public/parlamentar/10/carlos_alberto.jpg",
            "active": true,
            "main": true,
            "politicalParty": "DEM"
        },
        {
            "id": 1,
            "name": "Demir Peixoto",
            "urlImage": "https://sapl.maracanau.ce.leg.br/media/sapl/public/parlamentar/1/demir_peixoto.jpg",
            "active": true,
            "main": true,
            "politicalParty": "PSDB"
        },
        {
            "id": 30,
            "name": "ET",
            "urlImage": "https://sapl.maracanau.ce.leg.br/media/sapl/public/parlamentar/30/anderson.jfif",
            "active": true,
            "main": false,
            "politicalParty": "CD"
        },
        {
            "id": 23,
            "name": "Fabiano Braga",
            "urlImage": "https://sapl.maracanau.ce.leg.br/media/sapl/public/parlamentar/23/fabiano_braga.jpg",
            "active": true,
            "main": false,
            "politicalParty": "PSDB"
        },
        {
            "id": 18,
            "name": "Inspetor Moraes",
            "urlImage": "https://sapl.maracanau.ce.leg.br/media/sapl/public/parlamentar/18/inspetor_moraes.jpg",
            "active": true,
            "main": true,
            "politicalParty": "PTB"
        },
        {
            "id": 3,
            "name": "Irmão Raimundinho",
            "urlImage": "https://sapl.maracanau.ce.leg.br/media/sapl/public/parlamentar/3/irmao_raimundinho.jpg",
            "active": true,
            "main": true,
            "politicalParty": "PROS"
        },
        {
            "id": 29,
            "name": "Ivani Aguiar",
            "urlImage": "https://sapl.maracanau.ce.leg.br/media/sapl/public/parlamentar/29/ivani.png",
            "active": true,
            "main": false,
            "politicalParty": "MDB"
        },
        {
            "id": 8,
            "name": "Ivonaldo Lima",
            "urlImage": "https://sapl.maracanau.ce.leg.br/media/sapl/public/parlamentar/8/ivonaldo_lima.jpg",
            "active": true,
            "main": true,
            "politicalParty": "DEM"
        },
        {
            "id": 11,
            "name": "Jeorgenes Castro",
            "urlImage": "https://sapl.maracanau.ce.leg.br/media/sapl/public/parlamentar/11/jeorgenes.jpg",
            "active": true,
            "main": true,
            "politicalParty": "MDB"
        },
        {
            "id": 2,
            "name": "Léo Sales",
            "urlImage": "https://sapl.maracanau.ce.leg.br/media/sapl/public/parlamentar/2/leo_sales.jpg",
            "active": true,
            "main": true,
            "politicalParty": "DEM"
        },
        {
            "id": 6,
            "name": "Lucinildo",
            "urlImage": "https://sapl.maracanau.ce.leg.br/media/sapl/public/parlamentar/6/lucinildo.jpg",
            "active": true,
            "main": true,
            "politicalParty": "PSDB"
        },
        {
            "id": 4,
            "name": "Manoel Correia",
            "urlImage": "https://sapl.maracanau.ce.leg.br/media/sapl/public/parlamentar/4/manoel_correia.jfif",
            "active": true,
            "main": true,
            "politicalParty": "PTB"
        },
        {
            "id": 14,
            "name": "Paulinho do Cezinha",
            "urlImage": "https://sapl.maracanau.ce.leg.br/media/sapl/public/parlamentar/14/paulinho.jpg",
            "active": true,
            "main": true,
            "politicalParty": "PROS"
        },
        {
            "id": 7,
            "name": "Rafael Lacerda",
            "urlImage": "https://sapl.maracanau.ce.leg.br/media/sapl/public/parlamentar/7/rafael_lacerda.jpg",
            "active": true,
            "main": true,
            "politicalParty": "REP"
        },
        {
            "id": 19,
            "name": "Romualdo Bezerra",
            "urlImage": "https://sapl.maracanau.ce.leg.br/media/sapl/public/parlamentar/19/romualdo.jpg",
            "active": true,
            "main": true,
            "politicalParty": "PROS"
        },
        {
            "id": 20,
            "name": "Silvana Maciel",
            "urlImage": "https://sapl.maracanau.ce.leg.br/media/sapl/public/parlamentar/20/silvana.jpg",
            "active": true,
            "main": true,
            "politicalParty": "CD"
        },
        {
            "id": 27,
            "name": "Wagner Nogueira",
            "urlImage": "https://sapl.maracanau.ce.leg.br/media/sapl/public/parlamentar/27/wagner.jpg",
            "active": true,
            "main": false,
            "politicalParty": "PTB"
        }
    ]
  }

  getParlamentaresBeberibe(){

    return [
      {
          "id": 56,
          "name": "Amarílio da Lagoa de Dentro",
          "urlImage": "https://sapl.beberibe.ce.leg.br/media/sapl/public/parlamentar/56/amarildo.jpg",
          "active": true,
          "main": true,
          "politicalParty": "UNIÃO"
      },
      {
          "id": 12,
          "name": "Chico Cândido",
          "urlImage": "https://sapl.beberibe.ce.leg.br/media/sapl/public/parlamentar/12/ccandido.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PL"
      },
      {
          "id": 1,
          "name": "Eduardo Lima",
          "urlImage": "https://sapl.beberibe.ce.leg.br/media/sapl/public/parlamentar/1/eduardo_lima_SAi68jS.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PTB"
      },
      {
          "id": 25,
          "name": "Eliackson Cordeiro",
          "urlImage": "https://sapl.beberibe.ce.leg.br/media/sapl/public/parlamentar/25/eliackson.jpg",
          "active": true,
          "main": true,
          "politicalParty": "AVANTE"
      },
      {
          "id": 58,
          "name": "Gabriel Oliveira",
          "urlImage": "https://sapl.beberibe.ce.leg.br/media/sapl/public/parlamentar/58/gabriel_KnaWLmM.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PTB"
      },
      {
          "id": 59,
          "name": "Hernandes",
          "urlImage": "https://sapl.beberibe.ce.leg.br/media/sapl/public/parlamentar/59/hernandes_wwRdkkr.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PSD"
      },
      {
          "id": 2,
          "name": "Ivanir Filho",
          "urlImage": "https://sapl.beberibe.ce.leg.br/media/sapl/public/parlamentar/2/2_foto_parlamentar.jpeg",
          "active": true,
          "main": false,
          "politicalParty": "PP"
      },
      {
          "id": 57,
          "name": "João da Palmeira",
          "urlImage": "https://sapl.beberibe.ce.leg.br/media/sapl/public/parlamentar/57/joaodapalmeira.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PL"
      },
      {
          "id": 4,
          "name": "João do Valdemar",
          "urlImage": "https://sapl.beberibe.ce.leg.br/media/sapl/public/parlamentar/4/4_foto_parlamentar.jpeg",
          "active": true,
          "main": false,
          "politicalParty": "REP"
      },
      {
          "id": 3,
          "name": "Júnior Bessa",
          "urlImage": "https://sapl.beberibe.ce.leg.br/media/sapl/public/parlamentar/3/junior_bessa_7wvA9I5.jpg",
          "active": true,
          "main": true,
          "politicalParty": "UNIÃO"
      },
      {
          "id": 7,
          "name": "Júnior Parajuru",
          "urlImage": "https://sapl.beberibe.ce.leg.br/media/sapl/public/parlamentar/7/7_foto_parlamentar.jpeg",
          "active": true,
          "main": false,
          "politicalParty": "PSB"
      },
      {
          "id": 14,
          "name": "Lúcio da Coelce",
          "urlImage": "https://sapl.beberibe.ce.leg.br/media/sapl/public/parlamentar/14/lucio_da_coelce.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PL"
      },
      {
          "id": 60,
          "name": "Natan do Corte",
          "urlImage": "https://sapl.beberibe.ce.leg.br/media/sapl/public/parlamentar/60/natan_3wzG4RC.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PL"
      },
      {
          "id": 55,
          "name": "Paraíba das Redes",
          "urlImage": "https://sapl.beberibe.ce.leg.br/media/sapl/public/parlamentar/55/paraiba.jpg",
          "active": true,
          "main": true,
          "politicalParty": "REP"
      },
      {
          "id": 13,
          "name": "Piauí",
          "urlImage": "https://sapl.beberibe.ce.leg.br/media/sapl/public/parlamentar/13/piaui_6YtknYu.jpg",
          "active": true,
          "main": true,
          "politicalParty": "UNIÃO"
      },
      {
          "id": 28,
          "name": "Raimundo Louro",
          "urlImage": "https://sapl.beberibe.ce.leg.br/media/sapl/public/parlamentar/28/raimundo.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PSD"
      },
      {
          "id": 26,
          "name": "Samba",
          "urlImage": "https://sapl.beberibe.ce.leg.br/media/sapl/public/parlamentar/26/samba_yfLAAZZ.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PSD"
      },
      {
          "id": 5,
          "name": "Sandro Régis",
          "urlImage": "https://sapl.beberibe.ce.leg.br/media/sapl/public/parlamentar/5/5_foto_parlamentar.jpeg",
          "active": true,
          "main": false,
          "politicalParty": "REP"
      },
      {
          "id": 61,
          "name": "Thiago Monteiro",
          "urlImage": "https://sapl.beberibe.ce.leg.br/media/sapl/public/parlamentar/61/thiago_Mz3yPiE.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PDT"
      },
      {
          "id": 18,
          "name": "Toinho da Sucatinga",
          "urlImage": "https://sapl.beberibe.ce.leg.br/media/sapl/public/parlamentar/18/18_foto_parlamentar.jpeg",
          "active": true,
          "main": false,
          "politicalParty": "PDC"
      },
      {
          "id": 10,
          "name": "Zé Tomé",
          "urlImage": "https://sapl.beberibe.ce.leg.br/media/sapl/public/parlamentar/10/10_foto_parlamentar.jpeg",
          "active": true,
          "main": false,
          "politicalParty": "PP"
      }
  ];
  }

  getParlamentaresEusebio(){
    return [
      {
          "id": 39,
          "name": "Chico do Posto",
          "urlImage": "https://sapl.eusebio.ce.leg.br/media/sapl/public/parlamentar/39/chico_w5S2cJ0.jpg",
          "active": true,
          "main": false,
          "politicalParty": "PROS"
      },
      {
          "id": 6,
          "name": "Cira",
          "urlImage": "https://sapl.eusebio.ce.leg.br/media/sapl/public/parlamentar/6/cira.jpg",
          "active": true,
          "main": true,
          "politicalParty": "UNIÂO"
      },
      {
          "id": 43,
          "name": "Dyexon Abreu",
          "urlImage": "https://sapl.eusebio.ce.leg.br/media/sapl/public/parlamentar/43/dyexon.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PL"
      },
      {
          "id": 9,
          "name": "Ednardo Masseno",
          "urlImage": "https://sapl.eusebio.ce.leg.br/media/sapl/public/parlamentar/9/ednardo_masseno.jpg",
          "active": true,
          "main": true,
          "politicalParty": "UNIÂO"
      },
      {
          "id": 40,
          "name": "Elenilson de Abreu",
          "urlImage": "https://sapl.eusebio.ce.leg.br/media/sapl/public/parlamentar/40/elenilson_18I0oei.jpg",
          "active": true,
          "main": false,
          "politicalParty": "PL"
      },
      {
          "id": 2,
          "name": "Fares Filho",
          "urlImage": "https://sapl.eusebio.ce.leg.br/media/sapl/public/parlamentar/2/foto_escolhida_9951.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PL"
      },
      {
          "id": 37,
          "name": "Francisco Façanha",
          "urlImage": null,
          "active": true,
          "main": false,
          "politicalParty": "Não possui filiação"
      },
      {
          "id": 10,
          "name": "França",
          "urlImage": "https://sapl.eusebio.ce.leg.br/media/sapl/public/parlamentar/10/franca_OcowUzM.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PL"
      },
      {
          "id": 1,
          "name": "Goga",
          "urlImage": "https://sapl.eusebio.ce.leg.br/media/sapl/public/parlamentar/1/1_foto_parlamentar.jpeg",
          "active": true,
          "main": false,
          "politicalParty": "PMDB"
      },
      {
          "id": 42,
          "name": "Henrique do Timbú",
          "urlImage": "https://sapl.eusebio.ce.leg.br/media/sapl/public/parlamentar/42/henrique_do_timbu.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PL"
      },
      {
          "id": 15,
          "name": "Michel Chokito",
          "urlImage": "https://sapl.eusebio.ce.leg.br/media/sapl/public/parlamentar/15/michel_chokito.jpg",
          "active": true,
          "main": false,
          "politicalParty": "PL"
      },
      {
          "id": 12,
          "name": "Neila de Castro Sá",
          "urlImage": "https://sapl.eusebio.ce.leg.br/media/sapl/public/parlamentar/12/neila_0TUUC2s.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PL"
      },
      {
          "id": 38,
          "name": "Nildinho",
          "urlImage": "https://sapl.eusebio.ce.leg.br/media/sapl/public/parlamentar/38/nildinho_8kKC2ol.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PL"
      },
      {
          "id": 8,
          "name": "Nonato Xilito",
          "urlImage": "https://sapl.eusebio.ce.leg.br/media/sapl/public/parlamentar/8/nonato_xilito.png",
          "active": true,
          "main": true,
          "politicalParty": "UNIÂO"
      },
      {
          "id": 13,
          "name": "Paulo César",
          "urlImage": "https://sapl.eusebio.ce.leg.br/media/sapl/public/parlamentar/13/paulo_cesar_ensSKTi.jpg",
          "active": true,
          "main": true,
          "politicalParty": "UNIÂO"
      },
      {
          "id": 47,
          "name": "Rivelino da Mangabeira",
          "urlImage": "https://sapl.eusebio.ce.leg.br/media/sapl/public/parlamentar/47/rivelino_png.png",
          "active": true,
          "main": true,
          "politicalParty": "PSD"
      },
      {
          "id": 14,
          "name": "Roberto Rocha",
          "urlImage": "https://sapl.eusebio.ce.leg.br/media/sapl/public/parlamentar/14/roberto.jpg",
          "active": true,
          "main": true,
          "politicalParty": "UNIÂO"
      },
      {
          "id": 45,
          "name": "Silvia Aragão",
          "urlImage": "https://sapl.eusebio.ce.leg.br/media/sapl/public/parlamentar/45/silvia.jpeg",
          "active": true,
          "main": true,
          "politicalParty": "UNIÂO"
      },
      {
          "id": 11,
          "name": "Wanda",
          "urlImage": "https://sapl.eusebio.ce.leg.br/media/sapl/public/parlamentar/11/vanda_morais.jpg",
          "active": true,
          "main": true,
          "politicalParty": "UNIÂO"
      }
  ];
  }

  getParlamentaresHorizonte(){
    return [
      {
          "id": 42,
          "name": "Adriana Silveira",
          "urlImage": "https://sapl.horizonte.ce.leg.br/media/sapl/public/parlamentar/42/adriana_silveira.jpeg",
          "active": true,
          "main": true,
          "politicalParty": "PP"
      },
      {
          "id": 16,
          "name": "Alci",
          "urlImage": "https://sapl.horizonte.ce.leg.br/media/sapl/public/parlamentar/16/alci-d.jpg",
          "active": true,
          "main": false,
          "politicalParty": "REP"
      },
      {
          "id": 22,
          "name": "Antônio Filho",
          "urlImage": "https://sapl.horizonte.ce.leg.br/media/sapl/public/parlamentar/22/antonio_filho_djNlUvU.png",
          "active": true,
          "main": true,
          "politicalParty": "PSD"
      },
      {
          "id": 4,
          "name": "Auricino",
          "urlImage": "https://sapl.horizonte.ce.leg.br/media/sapl/public/parlamentar/4/4_foto_parlamentar.jpeg",
          "active": true,
          "main": false,
          "politicalParty": "PL"
      },
      {
          "id": 13,
          "name": "Carlinhos Nogueira",
          "urlImage": "https://sapl.horizonte.ce.leg.br/media/sapl/public/parlamentar/13/13_foto_parlamentar.jpeg",
          "active": true,
          "main": false,
          "politicalParty": "SD"
      },
      {
          "id": 9,
          "name": "Carlos da Bodega",
          "urlImage": "https://sapl.horizonte.ce.leg.br/media/sapl/public/parlamentar/9/carlos_da_bodega_1.png",
          "active": true,
          "main": true,
          "politicalParty": "PDT"
      },
      {
          "id": 7,
          "name": "Carlos Eloy",
          "urlImage": "https://sapl.horizonte.ce.leg.br/media/sapl/public/parlamentar/7/eloy.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PDT"
      },
      {
          "id": 11,
          "name": "Chelo Rocha",
          "urlImage": "https://sapl.horizonte.ce.leg.br/media/sapl/public/parlamentar/11/11_foto_parlamentar.jpeg",
          "active": true,
          "main": false,
          "politicalParty": "PSB"
      },
      {
          "id": 6,
          "name": "Cícero Cruz",
          "urlImage": "https://sapl.horizonte.ce.leg.br/media/sapl/public/parlamentar/6/6_foto_parlamentar.jpeg",
          "active": true,
          "main": false,
          "politicalParty": "PP"
      },
      {
          "id": 10,
          "name": "Delegado Kim Barreto",
          "urlImage": "https://sapl.horizonte.ce.leg.br/media/sapl/public/parlamentar/10/10_foto_parlamentar.jpeg",
          "active": true,
          "main": false,
          "politicalParty": "SD"
      },
      {
          "id": 25,
          "name": "Diego Pinheiro",
          "urlImage": "https://sapl.horizonte.ce.leg.br/media/sapl/public/parlamentar/25/diego_pinheiro.png",
          "active": true,
          "main": true,
          "politicalParty": "AVANTE"
      },
      {
          "id": 12,
          "name": "Dr. Alexandre",
          "urlImage": "https://sapl.horizonte.ce.leg.br/media/sapl/public/parlamentar/12/12_foto_parlamentar.jpeg",
          "active": true,
          "main": false,
          "politicalParty": "PSDC"
      },
      {
          "id": 21,
          "name": "Edson Papinha",
          "urlImage": "https://sapl.horizonte.ce.leg.br/media/sapl/public/parlamentar/21/edson_papinha_1.png",
          "active": true,
          "main": true,
          "politicalParty": "REP"
      },
      {
          "id": 27,
          "name": "Flávio da Coelce",
          "urlImage": "https://sapl.horizonte.ce.leg.br/media/sapl/public/parlamentar/27/flavio_da_coelce_46CvmaO.png",
          "active": true,
          "main": true,
          "politicalParty": "AVANTE"
      },
      {
          "id": 23,
          "name": "Getúlio Wargas",
          "urlImage": "https://sapl.horizonte.ce.leg.br/media/sapl/public/parlamentar/23/getulio_2.png",
          "active": true,
          "main": true,
          "politicalParty": "PTB"
      },
      {
          "id": 1,
          "name": "Haroldo da Saúde",
          "urlImage": "https://sapl.horizonte.ce.leg.br/media/sapl/public/parlamentar/1/haroldo_2.png",
          "active": true,
          "main": true,
          "politicalParty": "SD"
      },
      {
          "id": 26,
          "name": "Irmão Bento",
          "urlImage": "https://sapl.horizonte.ce.leg.br/media/sapl/public/parlamentar/26/irmao_bento_soBckE9.png",
          "active": true,
          "main": true,
          "politicalParty": "PSD"
      },
      {
          "id": 8,
          "name": "Itaciana",
          "urlImage": "https://sapl.horizonte.ce.leg.br/media/sapl/public/parlamentar/8/8_foto_parlamentar.jpeg",
          "active": true,
          "main": false,
          "politicalParty": "PDT"
      },
      {
          "id": 15,
          "name": "Júnior Tobias",
          "urlImage": "https://sapl.horizonte.ce.leg.br/media/sapl/public/parlamentar/15/15_foto_parlamentar.jpeg",
          "active": true,
          "main": false,
          "politicalParty": "SD"
      },
      {
          "id": 24,
          "name": "Leandro Lima",
          "urlImage": "https://sapl.horizonte.ce.leg.br/media/sapl/public/parlamentar/24/leandro_lima_1.png",
          "active": true,
          "main": true,
          "politicalParty": "PTB"
      },
      {
          "id": 2,
          "name": "Luciano Pinheiro",
          "urlImage": "https://sapl.horizonte.ce.leg.br/media/sapl/public/parlamentar/2/luciano_pinheiro.png",
          "active": true,
          "main": true,
          "politicalParty": "PP"
      },
      {
          "id": 5,
          "name": "Professor Simão",
          "urlImage": "https://sapl.horizonte.ce.leg.br/media/sapl/public/parlamentar/5/5_foto_parlamentar.jpeg",
          "active": true,
          "main": false,
          "politicalParty": "PL"
      },
      {
          "id": 19,
          "name": "Renan do Posto Coluna",
          "urlImage": "https://sapl.horizonte.ce.leg.br/media/sapl/public/parlamentar/19/renan.png",
          "active": true,
          "main": true,
          "politicalParty": "PSB"
      },
      {
          "id": 20,
          "name": "Tatiana Nogueira",
          "urlImage": "https://sapl.horizonte.ce.leg.br/media/sapl/public/parlamentar/20/tatyana_1.png",
          "active": true,
          "main": true,
          "politicalParty": "REP"
      },
      {
          "id": 3,
          "name": "Valda",
          "urlImage": "https://sapl.horizonte.ce.leg.br/media/sapl/public/parlamentar/3/valda1.png",
          "active": true,
          "main": true,
          "politicalParty": "PSB"
      }
  ];
  }

  getParlamentaresIraucuba(){
    return [
      {
          "id": 2,
          "name": "Abelhardo Araújo Alcântara",
          "urlImage": "https://sapl.iraucuba.ce.leg.br/media/sapl/public/parlamentar/2/abelhardo.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PSD"
      },
      {
          "id": 10,
          "name": "Antônio do Eudes",
          "urlImage": "https://sapl.iraucuba.ce.leg.br/media/sapl/public/parlamentar/10/antonio-do-eudes-55456.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PSD"
      },
      {
          "id": 9,
          "name": "Carlos Felipe de Sousa Fernandes",
          "urlImage": "https://sapl.iraucuba.ce.leg.br/media/sapl/public/parlamentar/9/felipe.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PSD"
      },
      {
          "id": 15,
          "name": "Elio Braga",
          "urlImage": "https://sapl.iraucuba.ce.leg.br/media/sapl/public/parlamentar/15/elio_braga.jfif",
          "active": true,
          "main": false,
          "politicalParty": "PSD"
      },
      {
          "id": 11,
          "name": "Francisco Barros Matias",
          "urlImage": "https://sapl.iraucuba.ce.leg.br/media/sapl/public/parlamentar/11/chiquinho_do_povo.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PSL"
      },
      {
          "id": 6,
          "name": "Francisco Xavier Asevedo Mesquita",
          "urlImage": "https://sapl.iraucuba.ce.leg.br/media/sapl/public/parlamentar/6/xavier.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PDT"
      },
      {
          "id": 5,
          "name": "João Batista Sousa Silva",
          "urlImage": "https://sapl.iraucuba.ce.leg.br/media/sapl/public/parlamentar/5/batista.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PDT"
      },
      {
          "id": 13,
          "name": "Penha da Saúde",
          "urlImage": null,
          "active": true,
          "main": false,
          "politicalParty": "Não possui filiação"
      },
      {
          "id": 7,
          "name": "Raimundo Alves Lopes",
          "urlImage": "https://sapl.iraucuba.ce.leg.br/media/sapl/public/parlamentar/7/raimundo_milton.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PSB"
      },
      {
          "id": 4,
          "name": "Rogério Barbosa Mesquita",
          "urlImage": "https://sapl.iraucuba.ce.leg.br/media/sapl/public/parlamentar/4/rogerio.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PDT"
      },
      {
          "id": 3,
          "name": "Tânia Alves",
          "urlImage": "https://sapl.iraucuba.ce.leg.br/media/sapl/public/parlamentar/3/tanya_2.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PDT"
      },
      {
          "id": 17,
          "name": "Terezinha da Saúde",
          "urlImage": "https://sapl.iraucuba.ce.leg.br/media/sapl/public/parlamentar/17/terezinha.jfif",
          "active": true,
          "main": false,
          "politicalParty": "PDT"
      },
      {
          "id": 1,
          "name": "Valmir Mota Rafael",
          "urlImage": "https://sapl.iraucuba.ce.leg.br/media/sapl/public/parlamentar/1/valmir.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PDT"
      },
      {
          "id": 8,
          "name": "Walmar de Andrade Braga Filho.",
          "urlImage": "https://sapl.iraucuba.ce.leg.br/media/sapl/public/parlamentar/8/walmar.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PSB"
      }
  ];  
  }

  getParlamentaresSaoGoncalo(){
    return [
      {
          "id": 7,
          "name": "Ailson",
          "urlImage": "https://sapl.saogoncalodoamarante.ce.leg.br/media/sapl/public/parlamentar/7/ailson.jpeg",
          "active": true,
          "main": true,
          "politicalParty": "PTB"
      },
      {
          "id": 38,
          "name": "Canoa",
          "urlImage": "https://sapl.saogoncalodoamarante.ce.leg.br/media/sapl/public/parlamentar/38/canoa.jpeg",
          "active": true,
          "main": true,
          "politicalParty": "PROS"
      },
      {
          "id": 39,
          "name": "Carlin Pereira",
          "urlImage": "https://sapl.saogoncalodoamarante.ce.leg.br/media/sapl/public/parlamentar/39/carlin.jpeg",
          "active": true,
          "main": true,
          "politicalParty": "PTB"
      },
      {
          "id": 37,
          "name": "Dúlcia Carvalho",
          "urlImage": "https://sapl.saogoncalodoamarante.ce.leg.br/media/sapl/public/parlamentar/37/dulcia.jpeg",
          "active": true,
          "main": true,
          "politicalParty": "PDT"
      },
      {
          "id": 40,
          "name": "Elsa Rodrigues",
          "urlImage": "https://sapl.saogoncalodoamarante.ce.leg.br/media/sapl/public/parlamentar/40/elsa.jpeg",
          "active": true,
          "main": true,
          "politicalParty": "PRTB"
      },
      {
          "id": 33,
          "name": "Esaú Monteiro",
          "urlImage": "https://sapl.saogoncalodoamarante.ce.leg.br/media/sapl/public/parlamentar/33/esau.jpeg",
          "active": true,
          "main": true,
          "politicalParty": "DEM"
      },
      {
          "id": 4,
          "name": "Magno do Pecém",
          "urlImage": "https://sapl.saogoncalodoamarante.ce.leg.br/media/sapl/public/parlamentar/4/magno.jpeg",
          "active": true,
          "main": true,
          "politicalParty": "PDT"
      },
      {
          "id": 34,
          "name": "Naira do Josinaldo",
          "urlImage": "https://sapl.saogoncalodoamarante.ce.leg.br/media/sapl/public/parlamentar/34/naira.jpeg",
          "active": true,
          "main": true,
          "politicalParty": "PTC"
      },
      {
          "id": 13,
          "name": "Neto do Pecém",
          "urlImage": "https://sapl.saogoncalodoamarante.ce.leg.br/media/sapl/public/parlamentar/13/neto_paO57te.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PSB"
      },
      {
          "id": 29,
          "name": "Pereira da Coelce",
          "urlImage": "https://sapl.saogoncalodoamarante.ce.leg.br/media/sapl/public/parlamentar/29/pereira.jpeg",
          "active": true,
          "main": true,
          "politicalParty": "PDT"
      },
      {
          "id": 36,
          "name": "Raphael Tavares",
          "urlImage": "https://sapl.saogoncalodoamarante.ce.leg.br/media/sapl/public/parlamentar/36/raphael.jpeg",
          "active": true,
          "main": true,
          "politicalParty": "PROS"
      },
      {
          "id": 35,
          "name": "Thiaguinho Santos",
          "urlImage": "https://sapl.saogoncalodoamarante.ce.leg.br/media/sapl/public/parlamentar/35/thiago.jpeg",
          "active": true,
          "main": true,
          "politicalParty": "PSB"
      },
      {
          "id": 3,
          "name": "Victor",
          "urlImage": "https://sapl.saogoncalodoamarante.ce.leg.br/media/sapl/public/parlamentar/3/victor.jpeg",
          "active": true,
          "main": true,
          "politicalParty": "PCdoB"
      }
  ];
  }

  getParlamentarAquiraz(){
    return [
      {
          "id": 13,
          "name": "Alex da Vanúzia",
          "urlImage": "https://sapl.aquiraz.ce.leg.br/media/sapl/public/parlamentar/13/alex.jpeg",
          "active": true,
          "main": true,
          "politicalParty": "PSB"
      },
      {
          "id": 9,
          "name": "Babá",
          "urlImage": "https://sapl.aquiraz.ce.leg.br/media/sapl/public/parlamentar/9/baba_aeGFZTG.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PDT"
      },
      {
          "id": 5,
          "name": "Carlos Cesar",
          "urlImage": "https://sapl.aquiraz.ce.leg.br/media/sapl/public/parlamentar/5/carlos_cesar_2.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PCdoB"
      },
      {
          "id": 6,
          "name": "Chico Carlos",
          "urlImage": "https://sapl.aquiraz.ce.leg.br/media/sapl/public/parlamentar/6/chico_carlos_2.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PDT"
      },
      {
          "id": 7,
          "name": "Claudio Diógenes",
          "urlImage": "https://sapl.aquiraz.ce.leg.br/media/sapl/public/parlamentar/7/claudio.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PL"
      },
      {
          "id": 18,
          "name": "Diego Queiroz",
          "urlImage": "https://sapl.aquiraz.ce.leg.br/media/sapl/public/parlamentar/18/image00002.jpeg",
          "active": true,
          "main": false,
          "politicalParty": "PL"
      },
      {
          "id": 4,
          "name": "Fernando do Picão",
          "urlImage": "https://sapl.aquiraz.ce.leg.br/media/sapl/public/parlamentar/4/fernando_laCbf9H.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PCdoB"
      },
      {
          "id": 3,
          "name": "Jair Silva",
          "urlImage": "https://sapl.aquiraz.ce.leg.br/media/sapl/public/parlamentar/3/jair_2_zBXPQnK.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PP"
      },
      {
          "id": 14,
          "name": "João Paulo Dantas",
          "urlImage": "https://sapl.aquiraz.ce.leg.br/media/sapl/public/parlamentar/14/joao_paulo_2_kEsuOhN.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PP"
      },
      {
          "id": 16,
          "name": "Marnei",
          "urlImage": "https://sapl.aquiraz.ce.leg.br/media/sapl/public/parlamentar/16/marnei_2.jpg",
          "active": true,
          "main": false,
          "politicalParty": "PSB"
      },
      {
          "id": 10,
          "name": "Mauricio Matos",
          "urlImage": "https://sapl.aquiraz.ce.leg.br/media/sapl/public/parlamentar/10/mauricio_2.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PL"
      },
      {
          "id": 1,
          "name": "Neide Queiroz",
          "urlImage": "https://sapl.aquiraz.ce.leg.br/media/sapl/public/parlamentar/1/neide_BIIcq01.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PDT"
      },
      {
          "id": 15,
          "name": "Ney Pires",
          "urlImage": "https://sapl.aquiraz.ce.leg.br/media/sapl/public/parlamentar/15/ney_pires.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PP"
      },
      {
          "id": 12,
          "name": "Peninha",
          "urlImage": "https://sapl.aquiraz.ce.leg.br/media/sapl/public/parlamentar/12/whatsapp_image_2022-10-24_at_14.12.27.jpeg",
          "active": true,
          "main": true,
          "politicalParty": "PL"
      },
      {
          "id": 2,
          "name": "Vandinho",
          "urlImage": "https://sapl.aquiraz.ce.leg.br/media/sapl/public/parlamentar/2/vandinho_2.jpg",
          "active": true,
          "main": true,
          "politicalParty": "PDT"
      }
  ];
  }

  getParlamentarCaninde(){
    return [
      {
          "id": 31,
          "name": "Adriano Ximenes",
          "urlImage": "https://sapl.caninde.ce.leg.br/media/sapl/public/parlamentar/31/adriano.png",
          "active": true,
          "main": true,
          "politicalParty": "PSB"
      },
      {
          "id": 34,
          "name": "Edinaldo Lourenço",
          "urlImage": "https://sapl.caninde.ce.leg.br/media/sapl/public/parlamentar/34/edinaldo.png",
          "active": true,
          "main": true,
          "politicalParty": "PMN"
      },
      {
          "id": 27,
          "name": "Evelton Xavier",
          "urlImage": "https://sapl.caninde.ce.leg.br/media/sapl/public/parlamentar/27/evelton.jpeg",
          "active": true,
          "main": true,
          "politicalParty": "SD"
      },
      {
          "id": 32,
          "name": "Giovane Lira",
          "urlImage": "https://sapl.caninde.ce.leg.br/media/sapl/public/parlamentar/32/geovane.png",
          "active": true,
          "main": true,
          "politicalParty": "PSD"
      },
      {
          "id": 35,
          "name": "Gleison Feitosa",
          "urlImage": "https://sapl.caninde.ce.leg.br/media/sapl/public/parlamentar/35/gleison.png",
          "active": true,
          "main": true,
          "politicalParty": "PL"
      },
      {
          "id": 21,
          "name": "Junior Castelo",
          "urlImage": "https://sapl.caninde.ce.leg.br/media/sapl/public/parlamentar/21/junior_castelo.jpeg",
          "active": true,
          "main": true,
          "politicalParty": "PSB"
      },
      {
          "id": 7,
          "name": "Karlinda Coêlho",
          "urlImage": "https://sapl.caninde.ce.leg.br/media/sapl/public/parlamentar/7/karlinda.jpeg",
          "active": true,
          "main": true,
          "politicalParty": "PSB"
      },
      {
          "id": 25,
          "name": "Manoel Deodato",
          "urlImage": "https://sapl.caninde.ce.leg.br/media/sapl/public/parlamentar/25/manoel_deodato.png",
          "active": true,
          "main": true,
          "politicalParty": "SD"
      },
      {
          "id": 29,
          "name": "Márcio Sousa",
          "urlImage": "https://sapl.caninde.ce.leg.br/media/sapl/public/parlamentar/29/marcio_sousa.png",
          "active": true,
          "main": true,
          "politicalParty": "UNIÃO"
      },
      {
          "id": 28,
          "name": "Priscila Magalhães",
          "urlImage": "https://sapl.caninde.ce.leg.br/media/sapl/public/parlamentar/28/priscila.png",
          "active": true,
          "main": true,
          "politicalParty": "PT"
      },
      {
          "id": 33,
          "name": "Professor Jardel Sousa",
          "urlImage": "https://sapl.caninde.ce.leg.br/media/sapl/public/parlamentar/33/jardel.png",
          "active": true,
          "main": true,
          "politicalParty": "PT"
      },
      {
          "id": 37,
          "name": "Professor Júnior",
          "urlImage": "https://sapl.caninde.ce.leg.br/media/sapl/public/parlamentar/37/74128aae-d5b7-422f-b002-28a709dde88e.jpeg",
          "active": true,
          "main": false,
          "politicalParty": "PT"
      },
      {
          "id": 39,
          "name": "Professor Sergio",
          "urlImage": "https://sapl.caninde.ce.leg.br/media/sapl/public/parlamentar/39/d7fde2bc-0f7a-4526-ace0-7efbbfc58e2d.jpeg",
          "active": true,
          "main": false,
          "politicalParty": "SD"
      },
      {
          "id": 24,
          "name": "Sandra Cordeiro",
          "urlImage": "https://sapl.caninde.ce.leg.br/media/sapl/public/parlamentar/24/sandra.png",
          "active": true,
          "main": true,
          "politicalParty": "UNIÃO"
      },
      {
          "id": 30,
          "name": "Sargento Nascimento",
          "urlImage": "https://sapl.caninde.ce.leg.br/media/sapl/public/parlamentar/30/sargento_nascimento.jpeg",
          "active": true,
          "main": true,
          "politicalParty": "UNIÃO"
      },
      {
          "id": 26,
          "name": "Tatiana Uchoa",
          "urlImage": "https://sapl.caninde.ce.leg.br/media/sapl/public/parlamentar/26/tatiana.png",
          "active": true,
          "main": true,
          "politicalParty": "PSD"
      },
      {
          "id": 38,
          "name": "Valdemar Filho",
          "urlImage": "https://sapl.caninde.ce.leg.br/media/sapl/public/parlamentar/38/182d2757-3998-4152-af53-6a472927c6de.jpeg",
          "active": true,
          "main": false,
          "politicalParty": "UNIÃO"
      }
  ];
  }
}
