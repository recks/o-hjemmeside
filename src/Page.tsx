import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import axios from 'axios';
import parse from 'html-react-parser';

async function getPage(page : string) {
    var filename = page.includes(".") ? page : page + ".txt";
    return await axios(filename).then(res => { return res });
}

interface LocationState {
  titel: string;
};

const Page = () => {
    const [page, setPage] = useState<string>("");
    const { pageId } = useParams();
    //console.log("pageId=" + pageId);
    const location = useLocation().state as LocationState;

    useEffect( () => {
        if (pageId) {
            getPage(pageId).then(res => {
                setPage(res.data);
            });
        };
    }, [pageId]);
    
    return (
        <div className='page-content'>
            <h1>{location?.titel}</h1>
            {parse(page)}
        </div>
    );
}

export default Page;

  