import uniq from "lodash/uniq";
import orderBy from "lodash/orderBy";
import { amrData } from "./amrData";

const typeOf = o =>
  Object.prototype.toString
    .call(o)
    .slice(8, -1)
    .toLowerCase();
const purify = o => JSON.parse(JSON.stringify(o)); // purify data

// const amrData = [
//   {
//     id: 1,
//     species: "Klebsiella pneumoniae",
//     st: "258",
//     lat: -37.8136,
//     long: 144.9631,
//     location: "Melbourne",
//     collecton_date: "2016",
//     source: "URINE",
//     type: "environmental/other",
//     amr: [
//       {
//         gene: "blaSHV-158",
//         coverage_map: "===============",
//         accession: "A7J11_02877",
//         product: "class A beta-lactamase SHV-158",
//         percent_cov: 100.0,
//         percent_id: 99.88
//       },
//       {
//         gene: "blaTEM-150",
//         coverage_map: "===============",
//         accession: "A7J11_02087",
//         product: "class A beta-lactamase TEM-150",
//         percent_cov: 100.0,
//         percent_id: 99.88
//       },
//       {
//         gene: "oqxA",
//         coverage_map: "===============",
//         accession: "A7J11_01238",
//         product:
//           "multidrug efflux RND transporter periplasmic adaptor subunit OqxA",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "oqxB",
//         coverage_map: "===============",
//         accession: "A7J11_02095",
//         product: "multidrug efflux RND transporter permease subunit OqxB",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "fosA6",
//         coverage_map: "===============",
//         accession: "A7J11_03821",
//         product: "fosfomycin resistance glutathione transferase FosA6",
//         percent_cov: 100.0,
//         percent_id: 98.81
//       },
//       {
//         gene: "catA1",
//         coverage_map: "===============",
//         accession: "A7J11_00207",
//         product: "type A-1 chloramphenicol O-acetyltransferase",
//         percent_cov: 100.0,
//         percent_id: 99.85
//       },
//       {
//         gene: "ant(2'')-Ia",
//         coverage_map: "=====..........",
//         accession: "A7J11_05246",
//         product: "aminoglycoside nucleotidyltransferase ANT(2'')-Ia",
//         percent_cov: 28.13,
//         percent_id: 99.53
//       },
//       {
//         gene: "dfrA12",
//         coverage_map: "===============",
//         accession: "A7J11_00227",
//         product: "trimethoprim-resistant dihydrofolate reductase DfrA12",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA2",
//         coverage_map: "===============",
//         accession: "A7J11_00221",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "qacEdelta1",
//         coverage_map: "===============",
//         accession: "A7J11_00271",
//         product:
//           "quaternary ammonium compound efflux SMR transporter QacE delta 1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "sul1",
//         coverage_map: "===============",
//         accession: "A7J11_00638",
//         product: "sulfonamide-resistant dihydropteroate synthase Sul1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "mph(A)",
//         coverage_map: "========/======",
//         accession: "A7J11_00571",
//         product: "Mph(A) family macrolide 2'-phosphotransferase",
//         percent_cov: 100.0,
//         percent_id: 99.67
//       },
//       {
//         gene: "A7J11_01233",
//         coverage_map: ".........======",
//         accession: "A7J11_01233",
//         product:
//           "bifunctional aminoglycoside N-acetyltransferase AAC(6')-30/aminoglycoside N-acetyltransferase AAC(6')-Ib'",
//         percent_cov: 40.02,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "===============",
//         accession: "A7J11_01094",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaOXA-9",
//         coverage_map: "==========.....",
//         accession: "A7J11_00977",
//         product: "oxacillin-hydrolyzing class D beta-lactamase OXA-9",
//         percent_cov: 62.42,
//         percent_id: 99.22
//       },
//       {
//         gene: "qnrB19",
//         coverage_map: "===============",
//         accession: "A7J11_02107",
//         product: "quinolone resistance pentapeptide repeat protein QnrB19",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaOXA-9",
//         coverage_map: ".........======",
//         accession: "A7J11_00977",
//         product: "oxacillin-hydrolyzing class D beta-lactamase OXA-9",
//         percent_cov: 39.76,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaTEM-112",
//         coverage_map: "=====..........",
//         accession: "A7J11_01343",
//         product: "class A extended-spectrum beta-lactamase TEM-112",
//         percent_cov: 27.87,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaTEM-1",
//         coverage_map: "............===",
//         accession: "A7J11_00169",
//         product: "class A broad-spectrum beta-lactamase TEM-1",
//         percent_cov: 14.05,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaKPC-3",
//         coverage_map: "===============",
//         accession: "A7J11_00124",
//         product: "carbapenem-hydrolyzing class A beta-lactamase KPC-3",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "A7J11_02581",
//         coverage_map: "........===....",
//         accession: "A7J11_02581",
//         product: "AAC(6')-Ib family aminoglycoside 6'-N-acetyltransferase",
//         percent_cov: 13.79,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaTEM-1",
//         coverage_map: "............===",
//         accession: "A7J11_00169",
//         product: "class A broad-spectrum beta-lactamase TEM-1",
//         percent_cov: 20.09,
//         percent_id: 100.0
//       }
//     ]
//   },
//   {
//     id: 2,
//     species: "Klebsiella pneumoniae",
//     st: "258",
//     lat: -37.8136,
//     long: 144.9631,
//     location: "Melbourne",
//     collecton_date: "2013-01",
//     source: "Wound",
//     type: "clinical",
//     amr: [
//       {
//         gene: "fosA6",
//         coverage_map: "===============",
//         accession: "A7J11_03821",
//         product: "fosfomycin resistance glutathione transferase FosA6",
//         percent_cov: 100.0,
//         percent_id: 98.81
//       },
//       {
//         gene: "blaSHV-158",
//         coverage_map: "===============",
//         accession: "A7J11_02877",
//         product: "class A beta-lactamase SHV-158",
//         percent_cov: 100.0,
//         percent_id: 99.88
//       },
//       {
//         gene: "blaTEM-1",
//         coverage_map: "............===",
//         accession: "A7J11_00169",
//         product: "class A broad-spectrum beta-lactamase TEM-1",
//         percent_cov: 20.09,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "=====..........",
//         accession: "A7J11_04543",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 27.65,
//         percent_id: 100.0
//       },
//       {
//         gene: "A7J11_02581",
//         coverage_map: "........=======",
//         accession: "A7J11_02581",
//         product: "AAC(6')-Ib family aminoglycoside 6'-N-acetyltransferase",
//         percent_cov: 42.17,
//         percent_id: 99.66
//       },
//       {
//         gene: "blaTEM-1",
//         coverage_map: "............===",
//         accession: "A7J11_00169",
//         product: "class A broad-spectrum beta-lactamase TEM-1",
//         percent_cov: 20.09,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "=====..........",
//         accession: "A7J11_04543",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 27.65,
//         percent_id: 100.0
//       },
//       {
//         gene: "A7J11_02581",
//         coverage_map: "........=======",
//         accession: "A7J11_02581",
//         product: "AAC(6')-Ib family aminoglycoside 6'-N-acetyltransferase",
//         percent_cov: 42.17,
//         percent_id: 99.66
//       },
//       {
//         gene: "oqxA",
//         coverage_map: "===============",
//         accession: "A7J11_01238",
//         product:
//           "multidrug efflux RND transporter periplasmic adaptor subunit OqxA",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "oqxB",
//         coverage_map: "===============",
//         accession: "A7J11_02095",
//         product: "multidrug efflux RND transporter permease subunit OqxB",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaSHV-12",
//         coverage_map: "===============",
//         accession: "A7J11_03649",
//         product: "class A extended-spectrum beta-lactamase SHV-12",
//         percent_cov: 100.0,
//         percent_id: 99.88
//       },
//       {
//         gene: "catA1",
//         coverage_map: "===============",
//         accession: "A7J11_00207",
//         product: "type A-1 chloramphenicol O-acetyltransferase",
//         percent_cov: 100.0,
//         percent_id: 99.85
//       },
//       {
//         gene: "ant(2'')-Ia",
//         coverage_map: "=====..........",
//         accession: "A7J11_05246",
//         product: "aminoglycoside nucleotidyltransferase ANT(2'')-Ia",
//         percent_cov: 28.13,
//         percent_id: 99.53
//       },
//       {
//         gene: "dfrA12",
//         coverage_map: "===============",
//         accession: "A7J11_00227",
//         product: "trimethoprim-resistant dihydrofolate reductase DfrA12",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA2",
//         coverage_map: "===============",
//         accession: "A7J11_00221",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "qacEdelta1",
//         coverage_map: "===============",
//         accession: "A7J11_00271",
//         product:
//           "quaternary ammonium compound efflux SMR transporter QacE delta 1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "sul1",
//         coverage_map: "===============",
//         accession: "A7J11_00638",
//         product: "sulfonamide-resistant dihydropteroate synthase Sul1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "mph(A)",
//         coverage_map: "========/======",
//         accession: "A7J11_00571",
//         product: "Mph(A) family macrolide 2'-phosphotransferase",
//         percent_cov: 100.0,
//         percent_id: 99.67
//       },
//       {
//         gene: "aph(3')-Ia",
//         coverage_map: "===============",
//         accession: "A7J11_00274",
//         product: "aminoglycoside O-phosphotransferase APH(3')-Ia",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaTEM-1",
//         coverage_map: "............===",
//         accession: "A7J11_00169",
//         product: "class A broad-spectrum beta-lactamase TEM-1",
//         percent_cov: 20.09,
//         percent_id: 100.0
//       },
//       {
//         gene: "A7J11_02581",
//         coverage_map: "........=======",
//         accession: "A7J11_02581",
//         product: "AAC(6')-Ib family aminoglycoside 6'-N-acetyltransferase",
//         percent_cov: 42.17,
//         percent_id: 99.66
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "=====..........",
//         accession: "A7J11_04543",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 27.65,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaTEM-1",
//         coverage_map: "............===",
//         accession: "A7J11_00169",
//         product: "class A broad-spectrum beta-lactamase TEM-1",
//         percent_cov: 20.09,
//         percent_id: 100.0
//       },
//       {
//         gene: "qnrS1",
//         coverage_map: "===============",
//         accession: "A7J11_01491",
//         product: "quinolone resistance pentapeptide repeat protein QnrS1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaKPC-2",
//         coverage_map: "===============",
//         accession: "A7J11_00838",
//         product: "carbapenem-hydrolyzing class A beta-lactamase KPC-2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       }
//     ]
//   },
//   {
//     id: 3,
//     species: "Klebsiella pneumoniae",
//     st: "258",
//     lat: -37.8136,
//     long: 144.9631,
//     location: "Melbourne",
//     collecton_date: "2012-10",
//     source: "Urine",
//     type: "clinical",
//     amr: [
//       {
//         gene: "blaSHV-12",
//         coverage_map: "===============",
//         accession: "A7J11_03649",
//         product: "class A extended-spectrum beta-lactamase SHV-12",
//         percent_cov: 100.0,
//         percent_id: 99.88
//       },
//       {
//         gene: "catA1",
//         coverage_map: "===============",
//         accession: "A7J11_00207",
//         product: "type A-1 chloramphenicol O-acetyltransferase",
//         percent_cov: 100.0,
//         percent_id: 99.85
//       },
//       {
//         gene: "ant(2'')-Ia",
//         coverage_map: "=====..........",
//         accession: "A7J11_05246",
//         product: "aminoglycoside nucleotidyltransferase ANT(2'')-Ia",
//         percent_cov: 28.13,
//         percent_id: 99.53
//       },
//       {
//         gene: "dfrA12",
//         coverage_map: "===============",
//         accession: "A7J11_00227",
//         product: "trimethoprim-resistant dihydrofolate reductase DfrA12",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA2",
//         coverage_map: "===============",
//         accession: "A7J11_00221",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "qacEdelta1",
//         coverage_map: "===============",
//         accession: "A7J11_00271",
//         product:
//           "quaternary ammonium compound efflux SMR transporter QacE delta 1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "sul1",
//         coverage_map: "===============",
//         accession: "A7J11_00638",
//         product: "sulfonamide-resistant dihydropteroate synthase Sul1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "mph(A)",
//         coverage_map: "========/======",
//         accession: "A7J11_00571",
//         product: "Mph(A) family macrolide 2'-phosphotransferase",
//         percent_cov: 100.0,
//         percent_id: 99.67
//       },
//       {
//         gene: "aph(3')-Ia",
//         coverage_map: "===============",
//         accession: "A7J11_00274",
//         product: "aminoglycoside O-phosphotransferase APH(3')-Ia",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaTEM-1",
//         coverage_map: "............===",
//         accession: "A7J11_00169",
//         product: "class A broad-spectrum beta-lactamase TEM-1",
//         percent_cov: 20.09,
//         percent_id: 100.0
//       },
//       {
//         gene: "A7J11_02581",
//         coverage_map: "........=======",
//         accession: "A7J11_02581",
//         product: "AAC(6')-Ib family aminoglycoside 6'-N-acetyltransferase",
//         percent_cov: 42.17,
//         percent_id: 99.66
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "=====..........",
//         accession: "A7J11_04543",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 27.65,
//         percent_id: 100.0
//       },
//       {
//         gene: "qnrS1",
//         coverage_map: "===============",
//         accession: "A7J11_01491",
//         product: "quinolone resistance pentapeptide repeat protein QnrS1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaKPC-2",
//         coverage_map: "===============",
//         accession: "A7J11_00838",
//         product: "carbapenem-hydrolyzing class A beta-lactamase KPC-2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "fosA6",
//         coverage_map: "===============",
//         accession: "A7J11_03821",
//         product: "fosfomycin resistance glutathione transferase FosA6",
//         percent_cov: 100.0,
//         percent_id: 98.81
//       },
//       {
//         gene: "blaSHV-158",
//         coverage_map: "===============",
//         accession: "A7J11_02877",
//         product: "class A beta-lactamase SHV-158",
//         percent_cov: 100.0,
//         percent_id: 99.88
//       },
//       {
//         gene: "blaTEM-1",
//         coverage_map: "............===",
//         accession: "A7J11_00169",
//         product: "class A broad-spectrum beta-lactamase TEM-1",
//         percent_cov: 20.09,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "=====..........",
//         accession: "A7J11_04543",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 27.65,
//         percent_id: 100.0
//       },
//       {
//         gene: "A7J11_02581",
//         coverage_map: "........=======",
//         accession: "A7J11_02581",
//         product: "AAC(6')-Ib family aminoglycoside 6'-N-acetyltransferase",
//         percent_cov: 42.17,
//         percent_id: 99.66
//       },
//       {
//         gene: "blaTEM-1",
//         coverage_map: "............===",
//         accession: "A7J11_00169",
//         product: "class A broad-spectrum beta-lactamase TEM-1",
//         percent_cov: 20.09,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "=====..........",
//         accession: "A7J11_04543",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 27.65,
//         percent_id: 100.0
//       },
//       {
//         gene: "A7J11_02581",
//         coverage_map: "........=======",
//         accession: "A7J11_02581",
//         product: "AAC(6')-Ib family aminoglycoside 6'-N-acetyltransferase",
//         percent_cov: 42.17,
//         percent_id: 99.66
//       },
//       {
//         gene: "oqxA",
//         coverage_map: "===============",
//         accession: "A7J11_01238",
//         product:
//           "multidrug efflux RND transporter periplasmic adaptor subunit OqxA",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "oqxB",
//         coverage_map: "===============",
//         accession: "A7J11_02095",
//         product: "multidrug efflux RND transporter permease subunit OqxB",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       }
//     ]
//   },
//   {
//     id: 4,
//     species: "Klebsiella pneumoniae",
//     st: "258",
//     lat: -37.8136,
//     long: 144.9631,
//     location: "Melbourne",
//     collecton_date: "2012-05",
//     source: "Wound",
//     type: "clinical",
//     amr: [
//       {
//         gene: "blaTEM-1",
//         coverage_map: "............===",
//         accession: "A7J11_00169",
//         product: "class A broad-spectrum beta-lactamase TEM-1",
//         percent_cov: 20.09,
//         percent_id: 100.0
//       },
//       {
//         gene: "A7J11_02581",
//         coverage_map: "........=======",
//         accession: "A7J11_02581",
//         product: "AAC(6')-Ib family aminoglycoside 6'-N-acetyltransferase",
//         percent_cov: 42.17,
//         percent_id: 99.66
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "====..../......",
//         accession: "A7J11_04543",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 27.65,
//         percent_id: 99.55
//       },
//       {
//         gene: "catA1",
//         coverage_map: "===============",
//         accession: "A7J11_00207",
//         product: "type A-1 chloramphenicol O-acetyltransferase",
//         percent_cov: 100.0,
//         percent_id: 99.85
//       },
//       {
//         gene: "ant(2'')-Ia",
//         coverage_map: "=====..........",
//         accession: "A7J11_05246",
//         product: "aminoglycoside nucleotidyltransferase ANT(2'')-Ia",
//         percent_cov: 28.13,
//         percent_id: 99.53
//       },
//       {
//         gene: "dfrA12",
//         coverage_map: "===============",
//         accession: "A7J11_00227",
//         product: "trimethoprim-resistant dihydrofolate reductase DfrA12",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA2",
//         coverage_map: "===============",
//         accession: "A7J11_00221",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "qacEdelta1",
//         coverage_map: "===============",
//         accession: "A7J11_00271",
//         product:
//           "quaternary ammonium compound efflux SMR transporter QacE delta 1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "sul1",
//         coverage_map: "===============",
//         accession: "A7J11_00638",
//         product: "sulfonamide-resistant dihydropteroate synthase Sul1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "mph(A)",
//         coverage_map: "========/======",
//         accession: "A7J11_00571",
//         product: "Mph(A) family macrolide 2'-phosphotransferase",
//         percent_cov: 100.0,
//         percent_id: 99.67
//       },
//       {
//         gene: "aph(3')-Ia",
//         coverage_map: "===============",
//         accession: "A7J11_00274",
//         product: "aminoglycoside O-phosphotransferase APH(3')-Ia",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaSHV-12",
//         coverage_map: "===============",
//         accession: "A7J11_03649",
//         product: "class A extended-spectrum beta-lactamase SHV-12",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "qnrS1",
//         coverage_map: "===============",
//         accession: "A7J11_01491",
//         product: "quinolone resistance pentapeptide repeat protein QnrS1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaKPC-2",
//         coverage_map: "===============",
//         accession: "A7J11_00838",
//         product: "carbapenem-hydrolyzing class A beta-lactamase KPC-2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "fosA6",
//         coverage_map: "===============",
//         accession: "A7J11_03821",
//         product: "fosfomycin resistance glutathione transferase FosA6",
//         percent_cov: 100.0,
//         percent_id: 98.81
//       },
//       {
//         gene: "blaSHV-158",
//         coverage_map: "===============",
//         accession: "A7J11_02877",
//         product: "class A beta-lactamase SHV-158",
//         percent_cov: 100.0,
//         percent_id: 99.88
//       },
//       {
//         gene: "blaTEM-1",
//         coverage_map: "............===",
//         accession: "A7J11_00169",
//         product: "class A broad-spectrum beta-lactamase TEM-1",
//         percent_cov: 20.09,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "=====..........",
//         accession: "A7J11_04543",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 27.65,
//         percent_id: 100.0
//       },
//       {
//         gene: "A7J11_02581",
//         coverage_map: "........=======",
//         accession: "A7J11_02581",
//         product: "AAC(6')-Ib family aminoglycoside 6'-N-acetyltransferase",
//         percent_cov: 42.17,
//         percent_id: 99.66
//       },
//       {
//         gene: "blaTEM-1",
//         coverage_map: "............===",
//         accession: "A7J11_00169",
//         product: "class A broad-spectrum beta-lactamase TEM-1",
//         percent_cov: 20.09,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "=====..........",
//         accession: "A7J11_04543",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 27.65,
//         percent_id: 100.0
//       },
//       {
//         gene: "A7J11_02581",
//         coverage_map: "........=======",
//         accession: "A7J11_02581",
//         product: "AAC(6')-Ib family aminoglycoside 6'-N-acetyltransferase",
//         percent_cov: 42.17,
//         percent_id: 99.66
//       },
//       {
//         gene: "oqxA",
//         coverage_map: "===============",
//         accession: "A7J11_01238",
//         product:
//           "multidrug efflux RND transporter periplasmic adaptor subunit OqxA",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "oqxB",
//         coverage_map: "===============",
//         accession: "A7J11_02095",
//         product: "multidrug efflux RND transporter permease subunit OqxB",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       }
//     ]
//   },
//   {
//     id: 5,
//     species: "Klebsiella pneumoniae",
//     st: "258",
//     lat: -37.8136,
//     long: 144.9631,
//     location: "Melbourne",
//     collecton_date: "2013-04",
//     source: "urine",
//     type: "clinical",
//     amr: [
//       {
//         gene: "mph(A)",
//         coverage_map: "========/======",
//         accession: "A7J11_00571",
//         product: "Mph(A) family macrolide 2'-phosphotransferase",
//         percent_cov: 100.0,
//         percent_id: 99.67
//       },
//       {
//         gene: "sul1",
//         coverage_map: "===============",
//         accession: "A7J11_00638",
//         product: "sulfonamide-resistant dihydropteroate synthase Sul1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "qacEdelta1",
//         coverage_map: "===============",
//         accession: "A7J11_00271",
//         product:
//           "quaternary ammonium compound efflux SMR transporter QacE delta 1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA2",
//         coverage_map: "===============",
//         accession: "A7J11_00221",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "dfrA12",
//         coverage_map: "===============",
//         accession: "A7J11_00227",
//         product: "trimethoprim-resistant dihydrofolate reductase DfrA12",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "ant(2'')-Ia",
//         coverage_map: "=====..........",
//         accession: "A7J11_05246",
//         product: "aminoglycoside nucleotidyltransferase ANT(2'')-Ia",
//         percent_cov: 28.13,
//         percent_id: 99.53
//       },
//       {
//         gene: "catA1",
//         coverage_map: "===============",
//         accession: "A7J11_00207",
//         product: "type A-1 chloramphenicol O-acetyltransferase",
//         percent_cov: 100.0,
//         percent_id: 99.85
//       },
//       {
//         gene: "blaTEM-1",
//         coverage_map: "............===",
//         accession: "A7J11_00169",
//         product: "class A broad-spectrum beta-lactamase TEM-1",
//         percent_cov: 20.09,
//         percent_id: 100.0
//       },
//       {
//         gene: "oqxA",
//         coverage_map: "===============",
//         accession: "A7J11_01238",
//         product:
//           "multidrug efflux RND transporter periplasmic adaptor subunit OqxA",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "oqxB",
//         coverage_map: "===============",
//         accession: "A7J11_02095",
//         product: "multidrug efflux RND transporter permease subunit OqxB",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "fosA6",
//         coverage_map: "===============",
//         accession: "A7J11_03821",
//         product: "fosfomycin resistance glutathione transferase FosA6",
//         percent_cov: 100.0,
//         percent_id: 98.81
//       },
//       {
//         gene: "blaKPC-2",
//         coverage_map: "===============",
//         accession: "A7J11_00838",
//         product: "carbapenem-hydrolyzing class A beta-lactamase KPC-2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "aph(3')-Ia",
//         coverage_map: "===============",
//         accession: "A7J11_00274",
//         product: "aminoglycoside O-phosphotransferase APH(3')-Ia",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "=====..........",
//         accession: "A7J11_04543",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 27.65,
//         percent_id: 100.0
//       },
//       {
//         gene: "A7J11_02581",
//         coverage_map: "........=======",
//         accession: "A7J11_02581",
//         product: "AAC(6')-Ib family aminoglycoside 6'-N-acetyltransferase",
//         percent_cov: 42.17,
//         percent_id: 99.66
//       },
//       {
//         gene: "blaSHV-12",
//         coverage_map: "===============",
//         accession: "A7J11_03649",
//         product: "class A extended-spectrum beta-lactamase SHV-12",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "qnrS1",
//         coverage_map: "===============",
//         accession: "A7J11_01491",
//         product: "quinolone resistance pentapeptide repeat protein QnrS1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       }
//     ]
//   },
//   {
//     id: 6,
//     species: "Klebsiella pneumoniae",
//     st: "258",
//     lat: -37.8136,
//     long: 144.9631,
//     location: "Melbourne",
//     collecton_date: "2013-03",
//     source: "urine",
//     type: "clinical",
//     amr: [
//       {
//         gene: "oqxB",
//         coverage_map: "===============",
//         accession: "A7J11_02095",
//         product: "multidrug efflux RND transporter permease subunit OqxB",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "oqxA",
//         coverage_map: "===============",
//         accession: "A7J11_01238",
//         product:
//           "multidrug efflux RND transporter periplasmic adaptor subunit OqxA",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "fosA6",
//         coverage_map: "===============",
//         accession: "A7J11_03821",
//         product: "fosfomycin resistance glutathione transferase FosA6",
//         percent_cov: 100.0,
//         percent_id: 98.81
//       },
//       {
//         gene: "catA1",
//         coverage_map: "===============",
//         accession: "A7J11_00207",
//         product: "type A-1 chloramphenicol O-acetyltransferase",
//         percent_cov: 100.0,
//         percent_id: 99.85
//       },
//       {
//         gene: "ant(2'')-Ia",
//         coverage_map: "=====..........",
//         accession: "A7J11_05246",
//         product: "aminoglycoside nucleotidyltransferase ANT(2'')-Ia",
//         percent_cov: 28.13,
//         percent_id: 99.53
//       },
//       {
//         gene: "dfrA12",
//         coverage_map: "===============",
//         accession: "A7J11_00227",
//         product: "trimethoprim-resistant dihydrofolate reductase DfrA12",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA2",
//         coverage_map: "===============",
//         accession: "A7J11_00221",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "qacEdelta1",
//         coverage_map: "===============",
//         accession: "A7J11_00271",
//         product:
//           "quaternary ammonium compound efflux SMR transporter QacE delta 1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "sul1",
//         coverage_map: "===============",
//         accession: "A7J11_00638",
//         product: "sulfonamide-resistant dihydropteroate synthase Sul1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "mph(A)",
//         coverage_map: "========/======",
//         accession: "A7J11_00571",
//         product: "Mph(A) family macrolide 2'-phosphotransferase",
//         percent_cov: 100.0,
//         percent_id: 99.67
//       },
//       {
//         gene: "A7J11_02581",
//         coverage_map: "........=======",
//         accession: "A7J11_02581",
//         product: "AAC(6')-Ib family aminoglycoside 6'-N-acetyltransferase",
//         percent_cov: 42.17,
//         percent_id: 99.66
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "=====..........",
//         accession: "A7J11_04543",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 27.65,
//         percent_id: 100.0
//       },
//       {
//         gene: "qnrS1",
//         coverage_map: "===============",
//         accession: "A7J11_01491",
//         product: "quinolone resistance pentapeptide repeat protein QnrS1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaKPC-2",
//         coverage_map: "===============",
//         accession: "A7J11_00838",
//         product: "carbapenem-hydrolyzing class A beta-lactamase KPC-2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "aph(3')-Ia",
//         coverage_map: "===============",
//         accession: "A7J11_00274",
//         product: "aminoglycoside O-phosphotransferase APH(3')-Ia",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaSHV-12",
//         coverage_map: "...........====",
//         accession: "A7J11_03649",
//         product: "class A extended-spectrum beta-lactamase SHV-12",
//         percent_cov: 21.14,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaSHV-158",
//         coverage_map: "...........====",
//         accession: "A7J11_02877",
//         product: "class A beta-lactamase SHV-158",
//         percent_cov: 21.14,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaSHV-158",
//         coverage_map: "===============",
//         accession: "A7J11_02877",
//         product: "class A beta-lactamase SHV-158",
//         percent_cov: 100.0,
//         percent_id: 99.88
//       }
//     ]
//   },
//   {
//     id: 7,
//     species: "Klebsiella pneumoniae",
//     st: "258",
//     lat: -37.8136,
//     long: 144.9631,
//     location: "Melbourne",
//     collecton_date: "2012-06",
//     source: "wound",
//     type: "clinical",
//     amr: [
//       {
//         gene: "mph(A)",
//         coverage_map: "========/======",
//         accession: "A7J11_00571",
//         product: "Mph(A) family macrolide 2'-phosphotransferase",
//         percent_cov: 100.0,
//         percent_id: 99.67
//       },
//       {
//         gene: "sul1",
//         coverage_map: "===============",
//         accession: "A7J11_00638",
//         product: "sulfonamide-resistant dihydropteroate synthase Sul1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "qacEdelta1",
//         coverage_map: "===============",
//         accession: "A7J11_00271",
//         product:
//           "quaternary ammonium compound efflux SMR transporter QacE delta 1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA2",
//         coverage_map: "===============",
//         accession: "A7J11_00221",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "dfrA12",
//         coverage_map: "===============",
//         accession: "A7J11_00227",
//         product: "trimethoprim-resistant dihydrofolate reductase DfrA12",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "ant(2'')-Ia",
//         coverage_map: "=====..........",
//         accession: "A7J11_05246",
//         product: "aminoglycoside nucleotidyltransferase ANT(2'')-Ia",
//         percent_cov: 28.13,
//         percent_id: 99.53
//       },
//       {
//         gene: "catA1",
//         coverage_map: "===============",
//         accession: "A7J11_00207",
//         product: "type A-1 chloramphenicol O-acetyltransferase",
//         percent_cov: 100.0,
//         percent_id: 99.85
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "=====..........",
//         accession: "A7J11_04543",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 21.72,
//         percent_id: 100.0
//       },
//       {
//         gene: "fosA6",
//         coverage_map: "===============",
//         accession: "A7J11_03821",
//         product: "fosfomycin resistance glutathione transferase FosA6",
//         percent_cov: 100.0,
//         percent_id: 98.81
//       },
//       {
//         gene: "qnrS1",
//         coverage_map: "===============",
//         accession: "A7J11_01491",
//         product: "quinolone resistance pentapeptide repeat protein QnrS1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaKPC-2",
//         coverage_map: "===============",
//         accession: "A7J11_00838",
//         product: "carbapenem-hydrolyzing class A beta-lactamase KPC-2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "oqxB",
//         coverage_map: "===============",
//         accession: "A7J11_02095",
//         product: "multidrug efflux RND transporter permease subunit OqxB",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "oqxA",
//         coverage_map: "===============",
//         accession: "A7J11_01238",
//         product:
//           "multidrug efflux RND transporter periplasmic adaptor subunit OqxA",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "A7J11_02581",
//         coverage_map: "........=======",
//         accession: "A7J11_02581",
//         product: "AAC(6')-Ib family aminoglycoside 6'-N-acetyltransferase",
//         percent_cov: 42.17,
//         percent_id: 99.66
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "=====..........",
//         accession: "A7J11_04543",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 27.65,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaSHV-187",
//         coverage_map: "============...",
//         accession: "A7J11_03083",
//         product: "class A beta-lactamase SHV-187",
//         percent_cov: 78.89,
//         percent_id: 99.56
//       },
//       {
//         gene: "blaSHV-12",
//         coverage_map: "..........====.",
//         accession: "A7J11_03649",
//         product: "class A extended-spectrum beta-lactamase SHV-12",
//         percent_cov: 22.88,
//         percent_id: 86.29
//       },
//       {
//         gene: "aph(3')-Ia",
//         coverage_map: "===============",
//         accession: "A7J11_00274",
//         product: "aminoglycoside O-phosphotransferase APH(3')-Ia",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaSHV-12",
//         coverage_map: "...........====",
//         accession: "A7J11_03649",
//         product: "class A extended-spectrum beta-lactamase SHV-12",
//         percent_cov: 21.14,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaSHV-158",
//         coverage_map: "...........====",
//         accession: "A7J11_02877",
//         product: "class A beta-lactamase SHV-158",
//         percent_cov: 21.14,
//         percent_id: 100.0
//       }
//     ]
//   },
//   {
//     id: 8,
//     species: "Klebsiella pneumoniae",
//     st: "258",
//     lat: -37.8136,
//     long: 144.9631,
//     location: "Melbourne",
//     collecton_date: "2012-08",
//     source: "urine",
//     type: "clinical",
//     amr: [
//       {
//         gene: "catA1",
//         coverage_map: "===============",
//         accession: "A7J11_00207",
//         product: "type A-1 chloramphenicol O-acetyltransferase",
//         percent_cov: 100.0,
//         percent_id: 99.85
//       },
//       {
//         gene: "ant(2'')-Ia",
//         coverage_map: "=====..........",
//         accession: "A7J11_05246",
//         product: "aminoglycoside nucleotidyltransferase ANT(2'')-Ia",
//         percent_cov: 28.13,
//         percent_id: 99.53
//       },
//       {
//         gene: "dfrA12",
//         coverage_map: "===============",
//         accession: "A7J11_00227",
//         product: "trimethoprim-resistant dihydrofolate reductase DfrA12",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA2",
//         coverage_map: "===============",
//         accession: "A7J11_00221",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "qacEdelta1",
//         coverage_map: "===============",
//         accession: "A7J11_00271",
//         product:
//           "quaternary ammonium compound efflux SMR transporter QacE delta 1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "sul1",
//         coverage_map: "===============",
//         accession: "A7J11_00638",
//         product: "sulfonamide-resistant dihydropteroate synthase Sul1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaSHV-12",
//         coverage_map: "...........====",
//         accession: "A7J11_03649",
//         product: "class A extended-spectrum beta-lactamase SHV-12",
//         percent_cov: 21.14,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaSHV-158",
//         coverage_map: "...........====",
//         accession: "A7J11_02877",
//         product: "class A beta-lactamase SHV-158",
//         percent_cov: 21.14,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaKPC-2",
//         coverage_map: "===============",
//         accession: "A7J11_00838",
//         product: "carbapenem-hydrolyzing class A beta-lactamase KPC-2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "qnrS1",
//         coverage_map: "===============",
//         accession: "A7J11_01491",
//         product: "quinolone resistance pentapeptide repeat protein QnrS1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaSHV-187",
//         coverage_map: "=============..",
//         accession: "A7J11_03083",
//         product: "class A beta-lactamase SHV-187",
//         percent_cov: 81.31,
//         percent_id: 99.57
//       },
//       {
//         gene: "mph(A)",
//         coverage_map: "========/======",
//         accession: "A7J11_00571",
//         product: "Mph(A) family macrolide 2'-phosphotransferase",
//         percent_cov: 100.0,
//         percent_id: 99.67
//       },
//       {
//         gene: "oqxB",
//         coverage_map: "===============",
//         accession: "A7J11_02095",
//         product: "multidrug efflux RND transporter permease subunit OqxB",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "oqxA",
//         coverage_map: "===============",
//         accession: "A7J11_01238",
//         product:
//           "multidrug efflux RND transporter periplasmic adaptor subunit OqxA",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaTEM-1",
//         coverage_map: "............===",
//         accession: "A7J11_00169",
//         product: "class A broad-spectrum beta-lactamase TEM-1",
//         percent_cov: 20.09,
//         percent_id: 100.0
//       },
//       {
//         gene: "fosA6",
//         coverage_map: "===============",
//         accession: "A7J11_03821",
//         product: "fosfomycin resistance glutathione transferase FosA6",
//         percent_cov: 100.0,
//         percent_id: 98.81
//       },
//       {
//         gene: "A7J11_02581",
//         coverage_map: "........=======",
//         accession: "A7J11_02581",
//         product: "AAC(6')-Ib family aminoglycoside 6'-N-acetyltransferase",
//         percent_cov: 42.17,
//         percent_id: 99.66
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "=====..........",
//         accession: "A7J11_04543",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 27.65,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA1",
//         coverage_map: ".====..........",
//         accession: "A7J11_04543",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 19.32,
//         percent_id: 100.0
//       }
//     ]
//   },
//   {
//     id: 9,
//     species: "Klebsiella pneumoniae",
//     st: "258",
//     lat: -37.8136,
//     long: 144.9631,
//     location: "Melbourne",
//     collecton_date: "2012-08",
//     source: "wound",
//     type: "clinical",
//     amr: [
//       {
//         gene: "blaSHV-158",
//         coverage_map: "===============",
//         accession: "A7J11_02877",
//         product: "class A beta-lactamase SHV-158",
//         percent_cov: 100.0,
//         percent_id: 99.88
//       },
//       {
//         gene: "fosA6",
//         coverage_map: "===============",
//         accession: "A7J11_03821",
//         product: "fosfomycin resistance glutathione transferase FosA6",
//         percent_cov: 100.0,
//         percent_id: 98.81
//       },
//       {
//         gene: "mph(A)",
//         coverage_map: "========/======",
//         accession: "A7J11_00571",
//         product: "Mph(A) family macrolide 2'-phosphotransferase",
//         percent_cov: 100.0,
//         percent_id: 99.67
//       },
//       {
//         gene: "sul1",
//         coverage_map: "===============",
//         accession: "A7J11_00638",
//         product: "sulfonamide-resistant dihydropteroate synthase Sul1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "qacEdelta1",
//         coverage_map: "===============",
//         accession: "A7J11_00271",
//         product:
//           "quaternary ammonium compound efflux SMR transporter QacE delta 1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA2",
//         coverage_map: "===============",
//         accession: "A7J11_00221",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "dfrA12",
//         coverage_map: "===============",
//         accession: "A7J11_00227",
//         product: "trimethoprim-resistant dihydrofolate reductase DfrA12",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "ant(2'')-Ia",
//         coverage_map: "=====..........",
//         accession: "A7J11_05246",
//         product: "aminoglycoside nucleotidyltransferase ANT(2'')-Ia",
//         percent_cov: 28.13,
//         percent_id: 99.53
//       },
//       {
//         gene: "catA1",
//         coverage_map: "===============",
//         accession: "A7J11_00207",
//         product: "type A-1 chloramphenicol O-acetyltransferase",
//         percent_cov: 100.0,
//         percent_id: 99.85
//       },
//       {
//         gene: "oqxB",
//         coverage_map: "===============",
//         accession: "A7J11_02095",
//         product: "multidrug efflux RND transporter permease subunit OqxB",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "oqxA",
//         coverage_map: "===============",
//         accession: "A7J11_01238",
//         product:
//           "multidrug efflux RND transporter periplasmic adaptor subunit OqxA",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaKPC-2",
//         coverage_map: "===============",
//         accession: "A7J11_00838",
//         product: "carbapenem-hydrolyzing class A beta-lactamase KPC-2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "qnrS1",
//         coverage_map: "===============",
//         accession: "A7J11_01491",
//         product: "quinolone resistance pentapeptide repeat protein QnrS1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "=====..........",
//         accession: "A7J11_04543",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 27.65,
//         percent_id: 100.0
//       },
//       {
//         gene: "A7J11_02581",
//         coverage_map: "........=======",
//         accession: "A7J11_02581",
//         product: "AAC(6')-Ib family aminoglycoside 6'-N-acetyltransferase",
//         percent_cov: 42.17,
//         percent_id: 99.66
//       },
//       {
//         gene: "aph(3')-Ia",
//         coverage_map: "===============",
//         accession: "A7J11_00274",
//         product: "aminoglycoside O-phosphotransferase APH(3')-Ia",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       }
//     ]
//   },
//   {
//     id: 9,
//     species: "Klebsiella pneumoniae",
//     st: "258",
//     lat: -37.8136,
//     long: 144.9631,
//     location: "Melbourne",
//     collecton_date: "2012-09",
//     source: "wound",
//     type: "clinical",
//     amr: [
//       {
//         gene: "oqxA",
//         coverage_map: "===============",
//         accession: "A7J11_01238",
//         product:
//           "multidrug efflux RND transporter periplasmic adaptor subunit OqxA",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "oqxB",
//         coverage_map: "===============",
//         accession: "A7J11_02095",
//         product: "multidrug efflux RND transporter permease subunit OqxB",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaKPC-2",
//         coverage_map: "===============",
//         accession: "A7J11_00838",
//         product: "carbapenem-hydrolyzing class A beta-lactamase KPC-2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "A7J11_02581",
//         coverage_map: "........=======",
//         accession: "A7J11_02581",
//         product: "AAC(6')-Ib family aminoglycoside 6'-N-acetyltransferase",
//         percent_cov: 42.17,
//         percent_id: 99.66
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "=====..........",
//         accession: "A7J11_04543",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 27.65,
//         percent_id: 100.0
//       },
//       {
//         gene: "fosA6",
//         coverage_map: "===============",
//         accession: "A7J11_03821",
//         product: "fosfomycin resistance glutathione transferase FosA6",
//         percent_cov: 100.0,
//         percent_id: 98.81
//       },
//       {
//         gene: "catA1",
//         coverage_map: "===============",
//         accession: "A7J11_00207",
//         product: "type A-1 chloramphenicol O-acetyltransferase",
//         percent_cov: 100.0,
//         percent_id: 99.85
//       },
//       {
//         gene: "ant(2'')-Ia",
//         coverage_map: "=====..........",
//         accession: "A7J11_05246",
//         product: "aminoglycoside nucleotidyltransferase ANT(2'')-Ia",
//         percent_cov: 28.13,
//         percent_id: 99.53
//       },
//       {
//         gene: "dfrA12",
//         coverage_map: "===============",
//         accession: "A7J11_00227",
//         product: "trimethoprim-resistant dihydrofolate reductase DfrA12",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA2",
//         coverage_map: "===============",
//         accession: "A7J11_00221",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "qacEdelta1",
//         coverage_map: "===============",
//         accession: "A7J11_00271",
//         product:
//           "quaternary ammonium compound efflux SMR transporter QacE delta 1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "sul1",
//         coverage_map: "===============",
//         accession: "A7J11_00638",
//         product: "sulfonamide-resistant dihydropteroate synthase Sul1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "mph(A)",
//         coverage_map: "========/======",
//         accession: "A7J11_00571",
//         product: "Mph(A) family macrolide 2'-phosphotransferase",
//         percent_cov: 100.0,
//         percent_id: 99.67
//       },
//       {
//         gene: "qnrS1",
//         coverage_map: "===============",
//         accession: "A7J11_01491",
//         product: "quinolone resistance pentapeptide repeat protein QnrS1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaSHV-12",
//         coverage_map: "===============",
//         accession: "A7J11_03649",
//         product: "class A extended-spectrum beta-lactamase SHV-12",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "aph(3')-Ia",
//         coverage_map: "===============",
//         accession: "A7J11_00274",
//         product: "aminoglycoside O-phosphotransferase APH(3')-Ia",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       }
//     ]
//   },
//   {
//     id: 10,
//     species: "Klebsiella pneumoniae",
//     st: "258",
//     lat: -37.8136,
//     long: 144.9631,
//     location: "Melbourne",
//     collecton_date: "2012-09",
//     source: "urine",
//     type: "clinical",
//     amr: [
//       {
//         gene: "blaSHV-155",
//         coverage_map: "===============",
//         accession: "A7J11_02874",
//         product: "class A beta-lactamase SHV-155",
//         percent_cov: 99.07,
//         percent_id: 99.77
//       },
//       {
//         gene: "fosA6",
//         coverage_map: "===============",
//         accession: "A7J11_03821",
//         product: "fosfomycin resistance glutathione transferase FosA6",
//         percent_cov: 100.0,
//         percent_id: 98.81
//       },
//       {
//         gene: "A7J11_02581",
//         coverage_map: "........=======",
//         accession: "A7J11_02581",
//         product: "AAC(6')-Ib family aminoglycoside 6'-N-acetyltransferase",
//         percent_cov: 42.17,
//         percent_id: 99.66
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "=====..........",
//         accession: "A7J11_04543",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 27.65,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaKPC-2",
//         coverage_map: "===============",
//         accession: "A7J11_00838",
//         product: "carbapenem-hydrolyzing class A beta-lactamase KPC-2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "catA1",
//         coverage_map: "===============",
//         accession: "A7J11_00207",
//         product: "type A-1 chloramphenicol O-acetyltransferase",
//         percent_cov: 100.0,
//         percent_id: 99.85
//       },
//       {
//         gene: "ant(2'')-Ia",
//         coverage_map: "=====..........",
//         accession: "A7J11_05246",
//         product: "aminoglycoside nucleotidyltransferase ANT(2'')-Ia",
//         percent_cov: 28.13,
//         percent_id: 99.53
//       },
//       {
//         gene: "dfrA12",
//         coverage_map: "===============",
//         accession: "A7J11_00227",
//         product: "trimethoprim-resistant dihydrofolate reductase DfrA12",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA2",
//         coverage_map: "===============",
//         accession: "A7J11_00221",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "qacEdelta1",
//         coverage_map: "===============",
//         accession: "A7J11_00271",
//         product:
//           "quaternary ammonium compound efflux SMR transporter QacE delta 1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "sul1",
//         coverage_map: "===============",
//         accession: "A7J11_00638",
//         product: "sulfonamide-resistant dihydropteroate synthase Sul1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "mph(A)",
//         coverage_map: "========/======",
//         accession: "A7J11_00571",
//         product: "Mph(A) family macrolide 2'-phosphotransferase",
//         percent_cov: 100.0,
//         percent_id: 99.67
//       },
//       {
//         gene: "oqxB",
//         coverage_map: "===============",
//         accession: "A7J11_02095",
//         product: "multidrug efflux RND transporter permease subunit OqxB",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "oqxA",
//         coverage_map: "===============",
//         accession: "A7J11_01238",
//         product:
//           "multidrug efflux RND transporter periplasmic adaptor subunit OqxA",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaSHV-158",
//         coverage_map: "...........====",
//         accession: "A7J11_02877",
//         product: "class A beta-lactamase SHV-158",
//         percent_cov: 21.02,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaSHV-12",
//         coverage_map: "...........====",
//         accession: "A7J11_03649",
//         product: "class A extended-spectrum beta-lactamase SHV-12",
//         percent_cov: 21.02,
//         percent_id: 100.0
//       },
//       {
//         gene: "aph(3')-Ia",
//         coverage_map: "===============",
//         accession: "A7J11_00274",
//         product: "aminoglycoside O-phosphotransferase APH(3')-Ia",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       }
//     ]
//   },
//   {
//     id: 11,
//     species: "Klebsiella pneumoniae",
//     st: "258",
//     lat: -37.8136,
//     long: 144.9631,
//     location: "Melbourne",
//     collecton_date: "2012-09",
//     source: "blood",
//     type: "clinical",
//     amr: [
//       {
//         gene: "oqxB",
//         coverage_map: "===============",
//         accession: "A7J11_02095",
//         product: "multidrug efflux RND transporter permease subunit OqxB",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "oqxA",
//         coverage_map: "===============",
//         accession: "A7J11_01238",
//         product:
//           "multidrug efflux RND transporter periplasmic adaptor subunit OqxA",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "=====..........",
//         accession: "A7J11_04543",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 27.65,
//         percent_id: 100.0
//       },
//       {
//         gene: "A7J11_02581",
//         coverage_map: "........=======",
//         accession: "A7J11_02581",
//         product: "AAC(6')-Ib family aminoglycoside 6'-N-acetyltransferase",
//         percent_cov: 42.17,
//         percent_id: 99.66
//       },
//       {
//         gene: "qnrS1",
//         coverage_map: "===============",
//         accession: "A7J11_01491",
//         product: "quinolone resistance pentapeptide repeat protein QnrS1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaKPC-2",
//         coverage_map: "===============",
//         accession: "A7J11_00838",
//         product: "carbapenem-hydrolyzing class A beta-lactamase KPC-2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "catA1",
//         coverage_map: "===============",
//         accession: "A7J11_00207",
//         product: "type A-1 chloramphenicol O-acetyltransferase",
//         percent_cov: 100.0,
//         percent_id: 99.85
//       },
//       {
//         gene: "ant(2'')-Ia",
//         coverage_map: "=====..........",
//         accession: "A7J11_05246",
//         product: "aminoglycoside nucleotidyltransferase ANT(2'')-Ia",
//         percent_cov: 28.13,
//         percent_id: 99.53
//       },
//       {
//         gene: "dfrA12",
//         coverage_map: "===============",
//         accession: "A7J11_00227",
//         product: "trimethoprim-resistant dihydrofolate reductase DfrA12",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA2",
//         coverage_map: "===============",
//         accession: "A7J11_00221",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "qacEdelta1",
//         coverage_map: "===============",
//         accession: "A7J11_00271",
//         product:
//           "quaternary ammonium compound efflux SMR transporter QacE delta 1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "sul1",
//         coverage_map: "===============",
//         accession: "A7J11_00638",
//         product: "sulfonamide-resistant dihydropteroate synthase Sul1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "mph(A)",
//         coverage_map: "========/======",
//         accession: "A7J11_00571",
//         product: "Mph(A) family macrolide 2'-phosphotransferase",
//         percent_cov: 100.0,
//         percent_id: 99.67
//       },
//       {
//         gene: "fosA6",
//         coverage_map: "===============",
//         accession: "A7J11_03821",
//         product: "fosfomycin resistance glutathione transferase FosA6",
//         percent_cov: 100.0,
//         percent_id: 98.81
//       },
//       {
//         gene: "blaSHV-12",
//         coverage_map: "===============",
//         accession: "A7J11_03649",
//         product: "class A extended-spectrum beta-lactamase SHV-12",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       }
//     ]
//   },
//   {
//     id: 12,
//     species: "Klebsiella pneumoniae",
//     st: "258",
//     lat: -37.8136,
//     long: 144.9631,
//     location: "Melbourne",
//     collecton_date: "2012-09",
//     source: "urine",
//     type: "clinical",
//     amr: [
//       {
//         gene: "fosA6",
//         coverage_map: "===============",
//         accession: "A7J11_03821",
//         product: "fosfomycin resistance glutathione transferase FosA6",
//         percent_cov: 100.0,
//         percent_id: 98.81
//       },
//       {
//         gene: "blaKPC-2",
//         coverage_map: "===============",
//         accession: "A7J11_00838",
//         product: "carbapenem-hydrolyzing class A beta-lactamase KPC-2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "qnrS1",
//         coverage_map: "===============",
//         accession: "A7J11_01491",
//         product: "quinolone resistance pentapeptide repeat protein QnrS1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "catA1",
//         coverage_map: "===============",
//         accession: "A7J11_00207",
//         product: "type A-1 chloramphenicol O-acetyltransferase",
//         percent_cov: 100.0,
//         percent_id: 99.85
//       },
//       {
//         gene: "ant(2'')-Ia",
//         coverage_map: "=====..........",
//         accession: "A7J11_05246",
//         product: "aminoglycoside nucleotidyltransferase ANT(2'')-Ia",
//         percent_cov: 28.13,
//         percent_id: 99.53
//       },
//       {
//         gene: "dfrA12",
//         coverage_map: "===============",
//         accession: "A7J11_00227",
//         product: "trimethoprim-resistant dihydrofolate reductase DfrA12",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA2",
//         coverage_map: "===============",
//         accession: "A7J11_00221",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "qacEdelta1",
//         coverage_map: "===============",
//         accession: "A7J11_00271",
//         product:
//           "quaternary ammonium compound efflux SMR transporter QacE delta 1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "sul1",
//         coverage_map: "===============",
//         accession: "A7J11_00638",
//         product: "sulfonamide-resistant dihydropteroate synthase Sul1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "mph(A)",
//         coverage_map: ".=======/======",
//         accession: "A7J11_00571",
//         product: "Mph(A) family macrolide 2'-phosphotransferase",
//         percent_cov: 91.21,
//         percent_id: 99.64
//       },
//       {
//         gene: "oqxA",
//         coverage_map: "===============",
//         accession: "A7J11_01238",
//         product:
//           "multidrug efflux RND transporter periplasmic adaptor subunit OqxA",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "oqxB",
//         coverage_map: "===============",
//         accession: "A7J11_02095",
//         product: "multidrug efflux RND transporter permease subunit OqxB",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "A7J11_02581",
//         coverage_map: "........=======",
//         accession: "A7J11_02581",
//         product: "AAC(6')-Ib family aminoglycoside 6'-N-acetyltransferase",
//         percent_cov: 42.17,
//         percent_id: 99.66
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "=====..........",
//         accession: "A7J11_04543",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 27.65,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaSHV-158",
//         coverage_map: "...........====",
//         accession: "A7J11_02877",
//         product: "class A beta-lactamase SHV-158",
//         percent_cov: 21.14,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaSHV-12",
//         coverage_map: "...........====",
//         accession: "A7J11_03649",
//         product: "class A extended-spectrum beta-lactamase SHV-12",
//         percent_cov: 21.14,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaSHV-187",
//         coverage_map: "=============..",
//         accession: "A7J11_03083",
//         product: "class A beta-lactamase SHV-187",
//         percent_cov: 81.31,
//         percent_id: 99.57
//       }
//     ]
//   },
//   {
//     id: 13,
//     species: "Klebsiella pneumoniae",
//     st: "258",
//     lat: -37.8136,
//     long: 144.9631,
//     location: "Melbourne",
//     collecton_date: "2012-11",
//     source: "wound",
//     type: "clinical",
//     amr: [
//       {
//         gene: "mph(A)",
//         coverage_map: "========/======",
//         accession: "A7J11_00571",
//         product: "Mph(A) family macrolide 2'-phosphotransferase",
//         percent_cov: 100.0,
//         percent_id: 99.67
//       },
//       {
//         gene: "sul1",
//         coverage_map: "===============",
//         accession: "A7J11_00638",
//         product: "sulfonamide-resistant dihydropteroate synthase Sul1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "qacEdelta1",
//         coverage_map: "===============",
//         accession: "A7J11_00271",
//         product:
//           "quaternary ammonium compound efflux SMR transporter QacE delta 1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA2",
//         coverage_map: "===============",
//         accession: "A7J11_00221",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "dfrA12",
//         coverage_map: "===============",
//         accession: "A7J11_00227",
//         product: "trimethoprim-resistant dihydrofolate reductase DfrA12",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "ant(2'')-Ia",
//         coverage_map: "=====..........",
//         accession: "A7J11_05246",
//         product: "aminoglycoside nucleotidyltransferase ANT(2'')-Ia",
//         percent_cov: 28.13,
//         percent_id: 99.53
//       },
//       {
//         gene: "catA1",
//         coverage_map: "===============",
//         accession: "A7J11_00207",
//         product: "type A-1 chloramphenicol O-acetyltransferase",
//         percent_cov: 100.0,
//         percent_id: 99.85
//       },
//       {
//         gene: "oqxA",
//         coverage_map: "===============",
//         accession: "A7J11_01238",
//         product:
//           "multidrug efflux RND transporter periplasmic adaptor subunit OqxA",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "oqxB",
//         coverage_map: "===============",
//         accession: "A7J11_02095",
//         product: "multidrug efflux RND transporter permease subunit OqxB",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaKPC-2",
//         coverage_map: "===============",
//         accession: "A7J11_00838",
//         product: "carbapenem-hydrolyzing class A beta-lactamase KPC-2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "qnrS1",
//         coverage_map: "===============",
//         accession: "A7J11_01491",
//         product: "quinolone resistance pentapeptide repeat protein QnrS1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "fosA6",
//         coverage_map: "===============",
//         accession: "A7J11_03821",
//         product: "fosfomycin resistance glutathione transferase FosA6",
//         percent_cov: 100.0,
//         percent_id: 98.81
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "=====..........",
//         accession: "A7J11_04543",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 27.65,
//         percent_id: 100.0
//       },
//       {
//         gene: "A7J11_02581",
//         coverage_map: "........=======",
//         accession: "A7J11_02581",
//         product: "AAC(6')-Ib family aminoglycoside 6'-N-acetyltransferase",
//         percent_cov: 42.17,
//         percent_id: 99.66
//       },
//       {
//         gene: "blaSHV-12",
//         coverage_map: "===============",
//         accession: "A7J11_03649",
//         product: "class A extended-spectrum beta-lactamase SHV-12",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "aph(3')-Ia",
//         coverage_map: "===============",
//         accession: "A7J11_00274",
//         product: "aminoglycoside O-phosphotransferase APH(3')-Ia",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       }
//     ]
//   },
//   {
//     id: 14,
//     species: "Klebsiella pneumoniae",
//     st: "258",
//     lat: -37.8136,
//     long: 144.9631,
//     location: "Melbourne",
//     collecton_date: "2012-11",
//     source: "sputum",
//     type: "clinical",
//     amr: [
//       {
//         gene: "oqxB",
//         coverage_map: "===============",
//         accession: "A7J11_02095",
//         product: "multidrug efflux RND transporter permease subunit OqxB",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "oqxA",
//         coverage_map: "===============",
//         accession: "A7J11_01238",
//         product:
//           "multidrug efflux RND transporter periplasmic adaptor subunit OqxA",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "fosA6",
//         coverage_map: "===============",
//         accession: "A7J11_03821",
//         product: "fosfomycin resistance glutathione transferase FosA6",
//         percent_cov: 100.0,
//         percent_id: 98.81
//       },
//       {
//         gene: "qnrS1",
//         coverage_map: "===============",
//         accession: "A7J11_01491",
//         product: "quinolone resistance pentapeptide repeat protein QnrS1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaKPC-2",
//         coverage_map: "===============",
//         accession: "A7J11_00838",
//         product: "carbapenem-hydrolyzing class A beta-lactamase KPC-2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "A7J11_02581",
//         coverage_map: "........=======",
//         accession: "A7J11_02581",
//         product: "AAC(6')-Ib family aminoglycoside 6'-N-acetyltransferase",
//         percent_cov: 42.17,
//         percent_id: 99.66
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "=====..........",
//         accession: "A7J11_04543",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 27.65,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaSHV-187",
//         coverage_map: "=============..",
//         accession: "A7J11_03083",
//         product: "class A beta-lactamase SHV-187",
//         percent_cov: 81.31,
//         percent_id: 99.57
//       },
//       {
//         gene: "blaSHV-158",
//         coverage_map: "...........====",
//         accession: "A7J11_02877",
//         product: "class A beta-lactamase SHV-158",
//         percent_cov: 21.14,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaSHV-12",
//         coverage_map: "...........====",
//         accession: "A7J11_03649",
//         product: "class A extended-spectrum beta-lactamase SHV-12",
//         percent_cov: 21.14,
//         percent_id: 100.0
//       }
//     ]
//   },
//   {
//     id: 15,
//     species: "Klebsiella pneumoniae",
//     st: "258",
//     lat: -37.8136,
//     long: 144.9631,
//     location: "Melbourne",
//     collecton_date: "2012-11",
//     source: "wound",
//     type: "clinical",
//     amr: [
//       {
//         gene: "blaSHV-158",
//         coverage_map: "===============",
//         accession: "A7J11_02877",
//         product: "class A beta-lactamase SHV-158",
//         percent_cov: 100.0,
//         percent_id: 99.88
//       },
//       {
//         gene: "oqxB",
//         coverage_map: "===============",
//         accession: "A7J11_02095",
//         product: "multidrug efflux RND transporter permease subunit OqxB",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "oqxA",
//         coverage_map: "===============",
//         accession: "A7J11_01238",
//         product:
//           "multidrug efflux RND transporter periplasmic adaptor subunit OqxA",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "=====..........",
//         accession: "A7J11_04543",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 27.65,
//         percent_id: 100.0
//       },
//       {
//         gene: "A7J11_02581",
//         coverage_map: "........=======",
//         accession: "A7J11_02581",
//         product: "AAC(6')-Ib family aminoglycoside 6'-N-acetyltransferase",
//         percent_cov: 42.17,
//         percent_id: 99.66
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "..===..........",
//         accession: "A7J11_04543",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 14.02,
//         percent_id: 100.0
//       },
//       {
//         gene: "qnrS1",
//         coverage_map: "===============",
//         accession: "A7J11_01491",
//         product: "quinolone resistance pentapeptide repeat protein QnrS1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "mph(A)",
//         coverage_map: "========/======",
//         accession: "A7J11_00571",
//         product: "Mph(A) family macrolide 2'-phosphotransferase",
//         percent_cov: 100.0,
//         percent_id: 99.67
//       },
//       {
//         gene: "sul1",
//         coverage_map: "===============",
//         accession: "A7J11_00638",
//         product: "sulfonamide-resistant dihydropteroate synthase Sul1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "qacEdelta1",
//         coverage_map: "===============",
//         accession: "A7J11_00271",
//         product:
//           "quaternary ammonium compound efflux SMR transporter QacE delta 1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA2",
//         coverage_map: "===============",
//         accession: "A7J11_00221",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "dfrA12",
//         coverage_map: "===============",
//         accession: "A7J11_00227",
//         product: "trimethoprim-resistant dihydrofolate reductase DfrA12",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "ant(2'')-Ia",
//         coverage_map: "=====..........",
//         accession: "A7J11_05246",
//         product: "aminoglycoside nucleotidyltransferase ANT(2'')-Ia",
//         percent_cov: 28.13,
//         percent_id: 99.53
//       },
//       {
//         gene: "catA1",
//         coverage_map: "===============",
//         accession: "A7J11_00207",
//         product: "type A-1 chloramphenicol O-acetyltransferase",
//         percent_cov: 100.0,
//         percent_id: 99.85
//       },
//       {
//         gene: "fosA6",
//         coverage_map: "===============",
//         accession: "A7J11_03821",
//         product: "fosfomycin resistance glutathione transferase FosA6",
//         percent_cov: 100.0,
//         percent_id: 98.81
//       },
//       {
//         gene: "blaKPC-2",
//         coverage_map: "===============",
//         accession: "A7J11_00838",
//         product: "carbapenem-hydrolyzing class A beta-lactamase KPC-2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "aph(3')-Ia",
//         coverage_map: "===============",
//         accession: "A7J11_00274",
//         product: "aminoglycoside O-phosphotransferase APH(3')-Ia",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       }
//     ]
//   },
//   {
//     id: 16,
//     species: "Klebsiella pneumoniae",
//     st: "258",
//     lat: -37.8136,
//     long: 144.9631,
//     location: "Melbourne",
//     collecton_date: "2012-11",
//     source: "urine",
//     type: "clinical",
//     amr: [
//       {
//         gene: "fosA6",
//         coverage_map: "===============",
//         accession: "A7J11_03821",
//         product: "fosfomycin resistance glutathione transferase FosA6",
//         percent_cov: 100.0,
//         percent_id: 98.81
//       },
//       {
//         gene: "blaKPC-2",
//         coverage_map: "===============",
//         accession: "A7J11_00838",
//         product: "carbapenem-hydrolyzing class A beta-lactamase KPC-2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "oqxB",
//         coverage_map: "===============",
//         accession: "A7J11_02095",
//         product: "multidrug efflux RND transporter permease subunit OqxB",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "oqxA",
//         coverage_map: "===============",
//         accession: "A7J11_01238",
//         product:
//           "multidrug efflux RND transporter periplasmic adaptor subunit OqxA",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "A7J11_02581",
//         coverage_map: "........=======",
//         accession: "A7J11_02581",
//         product: "AAC(6')-Ib family aminoglycoside 6'-N-acetyltransferase",
//         percent_cov: 42.17,
//         percent_id: 99.66
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "=====..........",
//         accession: "A7J11_04543",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 27.65,
//         percent_id: 100.0
//       },
//       {
//         gene: "mph(A)",
//         coverage_map: "========/======",
//         accession: "A7J11_00571",
//         product: "Mph(A) family macrolide 2'-phosphotransferase",
//         percent_cov: 100.0,
//         percent_id: 99.67
//       },
//       {
//         gene: "sul1",
//         coverage_map: "===============",
//         accession: "A7J11_00638",
//         product: "sulfonamide-resistant dihydropteroate synthase Sul1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "qacEdelta1",
//         coverage_map: "===============",
//         accession: "A7J11_00271",
//         product:
//           "quaternary ammonium compound efflux SMR transporter QacE delta 1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA2",
//         coverage_map: "===============",
//         accession: "A7J11_00221",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "dfrA12",
//         coverage_map: "===============",
//         accession: "A7J11_00227",
//         product: "trimethoprim-resistant dihydrofolate reductase DfrA12",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "ant(2'')-Ia",
//         coverage_map: "=====..........",
//         accession: "A7J11_05246",
//         product: "aminoglycoside nucleotidyltransferase ANT(2'')-Ia",
//         percent_cov: 28.13,
//         percent_id: 99.53
//       },
//       {
//         gene: "catA1",
//         coverage_map: "===============",
//         accession: "A7J11_00207",
//         product: "type A-1 chloramphenicol O-acetyltransferase",
//         percent_cov: 100.0,
//         percent_id: 99.85
//       },
//       {
//         gene: "qnrS1",
//         coverage_map: "===============",
//         accession: "A7J11_01491",
//         product: "quinolone resistance pentapeptide repeat protein QnrS1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaSHV-12",
//         coverage_map: "........=======",
//         accession: "A7J11_03649",
//         product: "class A extended-spectrum beta-lactamase SHV-12",
//         percent_cov: 45.3,
//         percent_id: 96.67
//       },
//       {
//         gene: "blaSHV-158",
//         coverage_map: "...........====",
//         accession: "A7J11_02877",
//         product: "class A beta-lactamase SHV-158",
//         percent_cov: 21.14,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaSHV-155",
//         coverage_map: "===============",
//         accession: "A7J11_02874",
//         product: "class A beta-lactamase SHV-155",
//         percent_cov: 97.21,
//         percent_id: 99.88
//       },
//       {
//         gene: "aph(3')-Ia",
//         coverage_map: "===============",
//         accession: "A7J11_00274",
//         product: "aminoglycoside O-phosphotransferase APH(3')-Ia",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       }
//     ]
//   },
//   {
//     id: 17,
//     species: "Klebsiella pneumoniae",
//     st: "258",
//     lat: -37.8136,
//     long: 144.9631,
//     location: "Melbourne",
//     collecton_date: "2012-11",
//     source: "urine",
//     type: "clinical",
//     amr: [
//       {
//         gene: "blaTEM-1",
//         coverage_map: "............===",
//         accession: "A7J11_00169",
//         product: "class A broad-spectrum beta-lactamase TEM-1",
//         percent_cov: 20.09,
//         percent_id: 100.0
//       },
//       {
//         gene: "catA1",
//         coverage_map: "===============",
//         accession: "A7J11_00207",
//         product: "type A-1 chloramphenicol O-acetyltransferase",
//         percent_cov: 100.0,
//         percent_id: 99.85
//       },
//       {
//         gene: "ant(2'')-Ia",
//         coverage_map: "=====..........",
//         accession: "A7J11_05246",
//         product: "aminoglycoside nucleotidyltransferase ANT(2'')-Ia",
//         percent_cov: 28.13,
//         percent_id: 99.53
//       },
//       {
//         gene: "dfrA12",
//         coverage_map: "===============",
//         accession: "A7J11_00227",
//         product: "trimethoprim-resistant dihydrofolate reductase DfrA12",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA2",
//         coverage_map: "===============",
//         accession: "A7J11_00221",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "qacEdelta1",
//         coverage_map: "===============",
//         accession: "A7J11_00271",
//         product:
//           "quaternary ammonium compound efflux SMR transporter QacE delta 1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "sul1",
//         coverage_map: "===============",
//         accession: "A7J11_00638",
//         product: "sulfonamide-resistant dihydropteroate synthase Sul1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "oqxA",
//         coverage_map: "===============",
//         accession: "A7J11_01238",
//         product:
//           "multidrug efflux RND transporter periplasmic adaptor subunit OqxA",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "oqxB",
//         coverage_map: "===============",
//         accession: "A7J11_02095",
//         product: "multidrug efflux RND transporter permease subunit OqxB",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "fosA6",
//         coverage_map: "===============",
//         accession: "A7J11_03821",
//         product: "fosfomycin resistance glutathione transferase FosA6",
//         percent_cov: 100.0,
//         percent_id: 98.81
//       },
//       {
//         gene: "blaSHV-158",
//         coverage_map: "...........====",
//         accession: "A7J11_02877",
//         product: "class A beta-lactamase SHV-158",
//         percent_cov: 21.14,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "=====..........",
//         accession: "A7J11_04543",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 27.65,
//         percent_id: 100.0
//       },
//       {
//         gene: "A7J11_02581",
//         coverage_map: "........=======",
//         accession: "A7J11_02581",
//         product: "AAC(6')-Ib family aminoglycoside 6'-N-acetyltransferase",
//         percent_cov: 42.17,
//         percent_id: 99.66
//       },
//       {
//         gene: "qnrS1",
//         coverage_map: "===============",
//         accession: "A7J11_01491",
//         product: "quinolone resistance pentapeptide repeat protein QnrS1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaKPC-2",
//         coverage_map: "===============",
//         accession: "A7J11_00838",
//         product: "carbapenem-hydrolyzing class A beta-lactamase KPC-2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaSHV-12",
//         coverage_map: "===============",
//         accession: "A7J11_03649",
//         product: "class A extended-spectrum beta-lactamase SHV-12",
//         percent_cov: 100.0,
//         percent_id: 99.65
//       },
//       {
//         gene: "blaSHV-12",
//         coverage_map: "...........====",
//         accession: "A7J11_03649",
//         product: "class A extended-spectrum beta-lactamase SHV-12",
//         percent_cov: 21.14,
//         percent_id: 100.0
//       },
//       {
//         gene: "mph(A)",
//         coverage_map: "========/======",
//         accession: "A7J11_00571",
//         product: "Mph(A) family macrolide 2'-phosphotransferase",
//         percent_cov: 100.0,
//         percent_id: 99.67
//       },
//       {
//         gene: "aph(3')-Ia",
//         coverage_map: "===============",
//         accession: "A7J11_00274",
//         product: "aminoglycoside O-phosphotransferase APH(3')-Ia",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       }
//     ]
//   },
//   {
//     id: 18,
//     species: "Klebsiella pneumoniae",
//     st: "258",
//     lat: -37.8136,
//     long: 144.9631,
//     location: "Melbourne",
//     collecton_date: "2013",
//     source: "tissue",
//     type: "clinical",
//     amr: [
//       {
//         gene: "blaSHV-12",
//         coverage_map: "===============",
//         accession: "A7J11_03649",
//         product: "class A extended-spectrum beta-lactamase SHV-12",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "oqxA",
//         coverage_map: "===============",
//         accession: "A7J11_01238",
//         product:
//           "multidrug efflux RND transporter periplasmic adaptor subunit OqxA",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "oqxB",
//         coverage_map: "===============",
//         accession: "A7J11_02095",
//         product: "multidrug efflux RND transporter permease subunit OqxB",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "fosA6",
//         coverage_map: "===============",
//         accession: "A7J11_03821",
//         product: "fosfomycin resistance glutathione transferase FosA6",
//         percent_cov: 100.0,
//         percent_id: 98.81
//       },
//       {
//         gene: "mph(A)",
//         coverage_map: "========/======",
//         accession: "A7J11_00571",
//         product: "Mph(A) family macrolide 2'-phosphotransferase",
//         percent_cov: 100.0,
//         percent_id: 99.67
//       },
//       {
//         gene: "sul1",
//         coverage_map: "===============",
//         accession: "A7J11_00638",
//         product: "sulfonamide-resistant dihydropteroate synthase Sul1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "qacEdelta1",
//         coverage_map: "===============",
//         accession: "A7J11_00271",
//         product:
//           "quaternary ammonium compound efflux SMR transporter QacE delta 1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA2",
//         coverage_map: "===============",
//         accession: "A7J11_00221",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA2",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "dfrA12",
//         coverage_map: "===============",
//         accession: "A7J11_00227",
//         product: "trimethoprim-resistant dihydrofolate reductase DfrA12",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "ant(2'')-Ia",
//         coverage_map: "=====..........",
//         accession: "A7J11_05246",
//         product: "aminoglycoside nucleotidyltransferase ANT(2'')-Ia",
//         percent_cov: 28.13,
//         percent_id: 99.53
//       },
//       {
//         gene: "catA1",
//         coverage_map: "===============",
//         accession: "A7J11_00207",
//         product: "type A-1 chloramphenicol O-acetyltransferase",
//         percent_cov: 100.0,
//         percent_id: 99.85
//       },
//       {
//         gene: "blaTEM-150",
//         coverage_map: "===============",
//         accession: "A7J11_02087",
//         product: "class A beta-lactamase TEM-150",
//         percent_cov: 100.0,
//         percent_id: 99.88
//       },
//       {
//         gene: "blaTEM-1",
//         coverage_map: "............===",
//         accession: "A7J11_00169",
//         product: "class A broad-spectrum beta-lactamase TEM-1",
//         percent_cov: 20.09,
//         percent_id: 100.0
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "=====..........",
//         accession: "A7J11_04543",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 27.65,
//         percent_id: 100.0
//       },
//       {
//         gene: "A7J11_02581",
//         coverage_map: "........=======",
//         accession: "A7J11_02581",
//         product: "AAC(6')-Ib family aminoglycoside 6'-N-acetyltransferase",
//         percent_cov: 42.17,
//         percent_id: 99.66
//       },
//       {
//         gene: "blaKPC-3",
//         coverage_map: "===============",
//         accession: "A7J11_00124",
//         product: "carbapenem-hydrolyzing class A beta-lactamase KPC-3",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaSHV-12",
//         coverage_map: "===============",
//         accession: "A7J11_03649",
//         product: "class A extended-spectrum beta-lactamase SHV-12",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       }
//     ]
//   },
//   {
//     id: 19,
//     species: "Klebsiella pneumoniae",
//     st: "258",
//     lat: -37.8136,
//     long: 144.9631,
//     location: "Melbourne",
//     collecton_date: "2013",
//     source: "Wound - deep sinus",
//     type: "clinical",
//     amr: [
//       {
//         gene: "blaSHV-11",
//         coverage_map: "===============",
//         accession: "A7J11_00232",
//         product: "class A broad-spectrum beta-lactamase SHV-11",
//         percent_cov: 100.0,
//         percent_id: 99.88
//       },
//       {
//         gene: "oqxA",
//         coverage_map: "===============",
//         accession: "A7J11_01238",
//         product:
//           "multidrug efflux RND transporter periplasmic adaptor subunit OqxA",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "oqxB",
//         coverage_map: "===============",
//         accession: "A7J11_02095",
//         product: "multidrug efflux RND transporter permease subunit OqxB",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "qnrB19",
//         coverage_map: "===============",
//         accession: "A7J11_02107",
//         product: "quinolone resistance pentapeptide repeat protein QnrB19",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "fosA6",
//         coverage_map: "===============",
//         accession: "A7J11_03821",
//         product: "fosfomycin resistance glutathione transferase FosA6",
//         percent_cov: 100.0,
//         percent_id: 98.81
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "..=============",
//         accession: "A7J11_01094",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 84.41,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaOXA-9",
//         coverage_map: "==========.....",
//         accession: "A7J11_00977",
//         product: "oxacillin-hydrolyzing class D beta-lactamase OXA-9",
//         percent_cov: 62.42,
//         percent_id: 99.22
//       },
//       {
//         gene: "A7J11_02581",
//         coverage_map: "........=======",
//         accession: "A7J11_02581",
//         product: "AAC(6')-Ib family aminoglycoside 6'-N-acetyltransferase",
//         percent_cov: 42.17,
//         percent_id: 99.66
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "=====..........",
//         accession: "A7J11_04543",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 27.65,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaTEM-1",
//         coverage_map: "............===",
//         accession: "A7J11_00169",
//         product: "class A broad-spectrum beta-lactamase TEM-1",
//         percent_cov: 20.09,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaKPC-3",
//         coverage_map: "===============",
//         accession: "A7J11_00124",
//         product: "carbapenem-hydrolyzing class A beta-lactamase KPC-3",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "A7J11_02581",
//         coverage_map: "........=======",
//         accession: "A7J11_02581",
//         product: "AAC(6')-Ib family aminoglycoside 6'-N-acetyltransferase",
//         percent_cov: 42.17,
//         percent_id: 99.66
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "===========....",
//         accession: "A7J11_04475",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 73.11,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaTEM-150",
//         coverage_map: "===============",
//         accession: "A7J11_02087",
//         product: "class A beta-lactamase TEM-150",
//         percent_cov: 100.0,
//         percent_id: 99.88
//       },
//       {
//         gene: "blaSHV-12",
//         coverage_map: "===============",
//         accession: "A7J11_03649",
//         product: "class A extended-spectrum beta-lactamase SHV-12",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       }
//     ]
//   },
//   {
//     id: 20,
//     species: "Klebsiella pneumoniae",
//     st: "258",
//     lat: -37.8136,
//     long: 144.9631,
//     location: "Melbourne",
//     collecton_date: "2014",
//     source: "Unknown",
//     type: "clinical",
//     amr: [
//       {
//         gene: "oqxA",
//         coverage_map: "===============",
//         accession: "A7J11_01238",
//         product:
//           "multidrug efflux RND transporter periplasmic adaptor subunit OqxA",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "oqxB",
//         coverage_map: "===============",
//         accession: "A7J11_02095",
//         product: "multidrug efflux RND transporter permease subunit OqxB",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaSHV-158",
//         coverage_map: "===============",
//         accession: "A7J11_02877",
//         product: "class A beta-lactamase SHV-158",
//         percent_cov: 100.0,
//         percent_id: 99.88
//       },
//       {
//         gene: "qnrB19",
//         coverage_map: "........=======",
//         accession: "A7J11_02107",
//         product: "quinolone resistance pentapeptide repeat protein QnrB19",
//         percent_cov: 45.12,
//         percent_id: 100.0
//       },
//       {
//         gene: "fosA6",
//         coverage_map: "===============",
//         accession: "A7J11_03821",
//         product: "fosfomycin resistance glutathione transferase FosA6",
//         percent_cov: 100.0,
//         percent_id: 98.81
//       },
//       {
//         gene: "blaSHV-12",
//         coverage_map: "===============",
//         accession: "A7J11_03649",
//         product: "class A extended-spectrum beta-lactamase SHV-12",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaKPC-3",
//         coverage_map: "===============",
//         accession: "A7J11_00124",
//         product: "carbapenem-hydrolyzing class A beta-lactamase KPC-3",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "A7J11_02581",
//         coverage_map: "........=======",
//         accession: "A7J11_02581",
//         product: "AAC(6')-Ib family aminoglycoside 6'-N-acetyltransferase",
//         percent_cov: 42.17,
//         percent_id: 99.66
//       },
//       {
//         gene: "aadA1",
//         coverage_map: "===============",
//         accession: "A7J11_01094",
//         product:
//           "ANT(3'')-Ia family aminoglycoside nucleotidyltransferase AadA1",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaOXA-9",
//         coverage_map: "==========.....",
//         accession: "A7J11_00977",
//         product: "oxacillin-hydrolyzing class D beta-lactamase OXA-9",
//         percent_cov: 62.42,
//         percent_id: 99.22
//       },
//       {
//         gene: "qnrB19",
//         coverage_map: "===============",
//         accession: "A7J11_02107",
//         product: "quinolone resistance pentapeptide repeat protein QnrB19",
//         percent_cov: 100.0,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaOXA-9",
//         coverage_map: ".........======",
//         accession: "A7J11_00977",
//         product: "oxacillin-hydrolyzing class D beta-lactamase OXA-9",
//         percent_cov: 39.76,
//         percent_id: 100.0
//       },
//       {
//         gene: "blaTEM-150",
//         coverage_map: "===============",
//         accession: "A7J11_02087",
//         product: "class A beta-lactamase TEM-150",
//         percent_cov: 100.0,
//         percent_id: 99.88
//       }
//     ]
//   }
// ];

export default function amrQuery(query) {
  query = purify(query);

  if (query["selection"] != null) {
    console.log(query["selection"]);
  }

  const { limit = 10, offset = 0, sort = "", order = "" } = query;

  let rows = amrData;

  // amr filter function
  function filterAmr(row) {
    let res = [];
    for (let r = 0; r < row.amr.length; r++) {
      if (
        row.amr[r].gene
          .toLowerCase()
          .replace("-", "")
          .search(this.query.toLowerCase().replace("-", "")) >= 0
      ) {
        res.push(true);
      }
    }
    if (res.length > 0) {
      return true;
    } else {
      return null;
    }
  }
  // custom query

  ["id", "species", "amr"].forEach(field => {
    // console.log(field);
    // console.log(query[field]);
    // console.log(typeOf(query[field]));

    switch (field) {
      case "amr":
        if (query["amr"] != null && query["amr"] != "") {
          rows = rows.filter(filterAmr, { query: query["amr"] });
        } else {
          rows = rows;
        }
        break;
      case "species":
        // rows = rows.filter(row =>
        //   row[field].toLowerCase().includes(query[field].toLowerCase())
        // );
        break;
      default:
        // nothing to do
        break;
    }
  });

  if (sort) {
    rows = orderBy(rows, sort, order);
  }

  const res = {
    rows: rows.slice(offset, offset + limit),
    total: rows.length,
    summary: {
      id: rows.length,
      species: uniq(rows.map(({ species }) => species)).length,
      type: uniq(rows.map(({ type }) => type.toLowerCase())).length,
      source: uniq(rows.map(({ source }) => source.toLowerCase())).length,
      location: uniq(rows.map(({ location }) => location.toLowerCase())).length,
      st: uniq(rows.map(({ st }) => st.toLowerCase())).length
    }
  };

  return Promise.resolve(purify(res));
}
