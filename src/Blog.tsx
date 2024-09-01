import { useState, useEffect } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';

interface BlogEntryData {
    dato: string,
    titel: string,
    tekst: string[]
}

interface BlogEntryProps {
    entry : BlogEntryData
}

const BlogEntry = (props : BlogEntryProps) => {
    return (
        <div key={'blogentry'+props.entry.dato} className="blogentry">
            <div key={'blogdate'+props.entry.dato} className="blogdate">{props.entry.dato}</div>
            <h2 key={'blogheader'+props.entry.dato}>{props.entry.titel}</h2>
            <div key={'blogtext'+props.entry.dato} className="blogtext">
                {props.entry.tekst.map((t) => (<p>{parse(t)}</p>))}
            </div>
        </div>
    )
}

async function getBlog() {
    return await axios("blog.json").then(res => { return res });
}

const Blog = () => {
    const [blog, setBlog] = useState<BlogEntryData[]>();

    useEffect( () => {
        getBlog().then(res => {
            setBlog(res.data);
        });
    }, []);
    
    return (
        <div key='blog' className='page-content'>
            {blog?.map((e) => (<BlogEntry key={'blog'+e.dato} entry={e}/>))}
        </div>
    );
}

export default Blog;

  