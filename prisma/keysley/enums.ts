export const Units = {
    G: "G",
    IU: "IU",
    KCAL: "KCAL",
    MCG_RE: "MCG_RE",
    MG: "MG",
    MG_ATE: "MG_ATE",
    MG_GAE: "MG_GAE",
    PH: "PH",
    SP_GR: "SP_GR",
    UG: "UG",
    UMOL_TE: "UMOL_TE",
    kJ: "kJ"
} as const;
export type Units = (typeof Units)[keyof typeof Units];
