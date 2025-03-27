import { GenerateNumberFromRange } from "../_helper/utilHelper";

const footballFields = [
  "california_field.jpg",
  "oklahoma_field.jpg",
  "oregon_field.jpg",
  "pennstate_1_field.jpg",
  "pennstate_2_field.jpg",
  "san_diego_field.jpg",
  "mclane_stadium.jpg",
  "michigan_field.jpg",
  "darrell_k_royal.jpg",
  "fsu_one.jpg",
  "fsu_two.jpg",
  "husky_stadium.webp",
  "sanford_stadium.jpg",
  "smu_stadium.jpg",
  "tcu_stadium.jpg",
  "vols_nation.jpg",
  "vols_nation_2.webp",
  "wazzu_field.jpeg",
  "amsoil.webp",
  "baton_rouge.jpeg",
  "bc_hockey.webp",
  "Bemidji_State_Arena.jpg",
  "boston_u.jpg",
  "fairbanks.webp",
  "gonzaga_basketball.webp",
  "hoosiers_basketball.webp",
  "KFC_Yum_Center.jpg",
  "mackey_arena.jpg",
  "maine.webp",
  "notre_dame_1.webp",
  "notre-dame-stadium-2.jpg",
  "phog_allen_fieldhouse.webp",
  "rupp_arena.jpg",
  "yost_arena.webp",
];

export const fieldImage = () => {
  const idx = GenerateNumberFromRange(0, footballFields.length - 1);
  return `https://calebrose.io/simfba-logo-cdn/pics/${footballFields[idx]}`;
};
