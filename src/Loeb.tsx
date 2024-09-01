import { MenuData } from "./Menu"
import { SponsorList } from "./Sponsors"

type Loeb = {
    navn : string,
    dato : Date,
    sted : string,
    beskrivelse : string,
    img : string,
    logo : string,
    facebook : string,
    menu : MenuData
    sponsors : SponsorList
}

export const defaultLoeb : Loeb = {
    navn: "Orienteringsløb",
    dato: new Date(),
    sted: "En skov",
    beskrivelse: "Standard orienteringsløb",
    img: "",
    logo: "",
    facebook: "",
    menu: [ {
        titel: "Orienteringsløb",
        indhold: "Foobar"
    } ],
    sponsors: [ {
        img: "",
        link: ""
    }]
}

export default Loeb;
