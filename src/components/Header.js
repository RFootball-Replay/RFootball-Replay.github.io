import { useSelector } from "react-redux";

function Header() {

  const version = useSelector((state) => state.mainMode.version);

  return (
    <div className="header">
      <span className="title">📀R.Football Replay v{version}</span>
      <a href="http://blog.haxball.com" target="_blank" rel='noreferrer'>News</a>
			<a href="https://www.haxball.com/play" class="active" target="_blank" rel='noreferrer'>Play</a>
			<a href="https://discord.gg/yeHYYHNub7" target="_blank" rel='noreferrer'>Discord</a>
			<a href="https://www.youtube.com/channel/UCpl_bGDTdxDUfXNL2ZKlsxA" target="_blank" rel='noreferrer'>YouTube</a>
			<a href="https://youtube.com/channel/UC0GtGdy-_t-fCjE7owtm36g" target="_blank" rel='noreferrer'>R.Football PR</a>
    </div >
  );
}

export default Header;