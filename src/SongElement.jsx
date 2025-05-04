import './SongElement.css'

function SongElement(props)
{
    function seconds_to_time(seconds)
    {
        const written_minutes=(Math.floor(seconds/60)).toString()
        let written_seconds=(seconds%60).toString();
        if(written_seconds.length<2)
        {
            written_seconds="0"+written_seconds;
        }
        //console.log(res);
        return written_minutes+":"+written_seconds;
    }
    function get_video_id(video_link)
    {
        let res=video_link;
        console.log("res "+res);
        res=res.replace("https://youtu.be/","");
        return res.split("?")[0];
    }
    function get_time(video_link)
    {
        let parts=video_link.split("t=");
        if(parts.length<2)
        {
            return 0;
        }
        return parseInt(parseInt(parts[1]));
    }

    let song=props.song;


    const song_video_id=get_video_id(song.Youtube_Link_Start);
    const song_src=`https://www.youtube.com/embed/${song_video_id}?si=GhQ9apUa2I1n7zyR&amp;start=${song.Start}`;
    const song_iframe=(
    <iframe width="560" height="315" 
    src={song_src} title="YouTube video player" 
    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
    gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    );

    /*TO DO- ADD IFRAME THAT HAS THE MUSIC CONTEXT*/
    let context_iframe="";
    let context_start_time=-1;
    if(song.Context)
    {
        const context_video_id=get_video_id(song.Context);
        context_start_time=get_time(song.Context);
        const context_src=`https://www.youtube.com/embed/${context_video_id}?si=GhQ9apUa2I1n7zyR&amp;start=${context_start_time}`;
        context_iframe=(
        <iframe width="560" height="315" 
        src={context_src} title="YouTube video player" 
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
        gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        );
    }

    return (
        <div className="border">
        <h2>{song.Name}</h2>
        <h3>Rank: {song.Rank}</h3>
        <p>{song.Seconds} Seconds</p> 
        <p>{seconds_to_time(song.Start)} - {seconds_to_time(song.End)}</p>
        <h3>Spotify</h3>
        <a href={song.Spotify}>{song.Spotify}</a>
        <h3>Youtube</h3>
        <a href={song.Youtube_Link}>{song.Youtube_Link}</a>
        <h3>Song Link</h3>
        {song_iframe}
        <h3>Song Context</h3>
        {context_iframe}
        </div>
    )
}
export default SongElement;