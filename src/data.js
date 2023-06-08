// Crossing data for testing
const data = [
  {
    "id": 1,
    "name": "bungkul barat",
    "latitude": -7.291488,
    "longitude": 112.739180,
    "heading": -91.920380
  },
  {
    "id": 2,
    "name": "bungkul timur",
    "latitude": -7.291481,
    "longitude": 112.738874,
    "heading": 89.411891
  },
  {
    "id": 3,
    "name": "al falah barat",
    "latitude": -7.295472,
    "longitude": 112.739458,
    "heading": -92.854210
  },
  {
    "id": 4,
    "name": "taman mayangkara timur",
    "latitude": -7.295371,
    "longitude": 112.739063,
    "heading": 112.775627
  },
  {
    "id": 5,
    "name": "darmo bengawan timur",
    "latitude": -7.289887,
    "longitude": 112.738794,
    "heading": 91.811779
  },
  {
    "id": 6,
    "name": "ciliwung selatan",
    "latitude": -7.292343,
    "longitude": 112.736966,
    "heading": 148.448275
  },
  {
    "id": 7,
    "name": "diponegoro timur",
    "latitude": -7.292472,
    "longitude": 112.737158,
    "heading": 63.303654
  },
  {
    "id": 8,
    "name": "diponegoro barat",
    "latitude": -7.291977,
    "longitude": 112.737344,
    "heading": -118.895728
  },
  {
    "id": 9,
    "name": "taman mayangkara selatan",
    "latitude": -7.295371,
    "longitude": 112.739063,
    "heading": 112.775627
  },
  {
    "id": 10,
    "name": "darmo bengawan selatan",
    "latitude": -7.289784,
    "longitude": 112.738838,
    "heading": 91.811774
  },
  {
    "id": 11,
    "name": "diponegoro 2 timur",
    "latitude": -7.290370,
    "longitude": 112.736082,
    "heading": -118.895568
  },
  {
    "id": 12,
    "name": "kutai selatan",
    "latitude": -7.290381,
    "longitude": 112.735952,
    "heading": 63.712977
  },
  {
    "id": 13,
    "name": "diponegoro 2 utara",
    "latitude": -7.290106,
    "longitude": 112.736543,
    "heading": -112.005888
  },
  {
    "id": 14,
    "name": "rs darmo timur",
    "latitude": -7.287207,
    "longitude": 112.739109,
    "heading": -18.331708
  },
  {
    "id": 15,
    "name": "rs darmo selatan",
    "latitude": -7.287451,
    "longitude": 112.739504,
    "heading": 116.575381
  },
  {
    "id": 16,
    "name": "darmo timur",
    "latitude": -7.286107,
    "longitude": 112.739635,
    "heading": 48.170125
  },
  {
    "id": 17,
    "name": "darmo barat",
    "latitude": -7.286098,
    "longitude": 112.739563,
    "heading": 102.940820
  },
  {
    "id": 18,
    "name": "darmo 2 timur",
    "latitude": -7.280990,
    "longitude": 112.740526,
    "heading": -168.426531
  },
  {
    "id": 19,
    "name": "darmo 2 barat",
    "latitude": -7.281010,
    "longitude": 112.740758,
    "heading": 140.338557
  },
  {
    "id": 20,
    "name": "musi utara",
    "latitude": -7.286274,
    "longitude": 112.734560,
    "heading": -58.770696
  },
  {
    "id": 21,
    "name": "musi selatan",
    "latitude": -7.286470,
    "longitude": 112.734005,
    "heading": 58.325921
  },
  {
    "id": 22,
    "name": "bengawan utara",
    "latitude": -7.290918,
    "longitude": 112.742068,
    "heading": 153.566246
  },
  {
    "id": 23,
    "name": "pandegiling selatan",
    "latitude": -7.277205,
    "longitude": 112.741030,
    "heading": 109.534133
  },
  {
    "id": 24,
    "name": "pandegiling utara",
    "latitude": -7.277501,
    "longitude": 112.741446,
    "heading": 3.214264
  },
  {
    "id": 25,
    "name": "intiland timur",
    "latitude": -7.272498,
    "longitude": 112.742540,
    "heading": -9.545688
  },
  {
    "id": 26,
    "name": "intiland barat",
    "latitude": -7.272562,
    "longitude": 112.742617,
    "heading": -69.921487
  },
  {
    "id": 27,
    "name": "dyandra timur",
    "latitude": -7.269413,
    "longitude": 112.741525,
    "heading": 42.176017
  },
  {
    "id": 28,
    "name": "dyandra barat",
    "latitude": -7.269418,
    "longitude": 112.741527,
    "heading": 88.021393
  },
  {
    "id": 29,
    "name": "suryo selatan",
    "latitude": -7.263007,
    "longitude": 112.741801,
    "heading": 171.027947
  },
  {
    "id": 30,
    "name": "suryo utara",
    "latitude": -7.263003,
    "longitude": 112.741799,
    "heading": -164.056519
  },
  {
    "id": 31,
    "name": "diponegoro 3 timur",
    "latitude": -7.281055,
    "longitude": 112.731474,
    "heading": -13.599135
  },
  {
    "id": 32,
    "name": "diponegoro 3 barat",
    "latitude": -7.280882,
    "longitude": 112.731551,
    "heading": 102.645726
  },
  {
    "id": 33,
    "name": "dprd timur",
    "latitude": -7.263127,
    "longitude": 112.745968,
    "heading": -75.181956
  },
  {
    "id": 34,
    "name": "dprd barat",
    "latitude": -7.263133,
    "longitude": 112.746017,
    "heading": 79.454273
  },
  {
    "id": 35,
    "name": "praxis selatan",
    "latitude": -7.272374,
    "longitude": 112.744202,
    "heading": 108.264572
  },
  {
    "id": 36,
    "name": "praxis barat",
    "latitude": -7.272301,
    "longitude": 112.744612,
    "heading": -132.000539
  },
  {
    "id": 37,
    "name": "praxis timur",
    "latitude": -7.272706,
    "longitude": 112.744180,
    "heading": 29.657533
  },
  {
    "id": 38,
    "name": "praxis utara",
    "latitude": -7.272701,
    "longitude": 112.744555,
    "heading": -12.802865
  }
];

module.exports = {
  data
};