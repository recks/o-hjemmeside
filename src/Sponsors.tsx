import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import {Link} from "react-router-dom";

export type SponsorList = Array<Sponsor>;
type Sponsor = {
    img: string;
    link: string;
}

interface SponsorProps {
    sponsorList: SponsorList;
}

class Sponsors extends Component<SponsorProps> {
    render() {
        return (
            <div className='border-top text-center'>
                { this.props.sponsorList ? this.props.sponsorList.map(s => { 
                    return s.link !== "" ? <Link to={s.link} key={s.link}><Image src={s.img} className='p-3'/></Link> : <Image src={s.img} className='p-3'/>
                }) : "" }
            </div>
        );
    }
}

export default Sponsors;
