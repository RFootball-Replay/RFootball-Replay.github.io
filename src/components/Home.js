import Changelog from "./changelog/Changelog";
import $ from 'jquery'
import { handleFile } from "../game2.js";
import LoadingScreen from "./LoadingScreen";
import { useSelector, useDispatch } from "react-redux";
import { setMainMode } from "../slices/mainModeSlice";
import { setDivStyle, setStats, setPlayerList, setPlayerPos, clearStats } from "../slices/gameStatsSlice";
import GameStats from "./game stats/GameStats";

export function showStats() { }
export function setGameStats() { }
export function dispatchPlayerList() { }
export function dispatchPlayerPos() { }
export function dispatchClearStats() { }

function Home() {

  const dispatch = useDispatch();
  const mainMode = useSelector((state) => state.mainMode.value);
  const version = useSelector((state) => state.mainMode.version);

  function showStatsExp(elStyle) {
    const { offsetLeft, offsetTop, clientWidth, clientHeight } = elStyle;
    const offsetParentTop = elStyle.offsetParent.offsetTop;
    dispatch(setDivStyle({ offsetLeft, offsetTop, offsetParentTop, clientWidth, clientHeight }));
    dispatch(setMainMode('stats'));
  }

  function setGameStatsExp(stats) {
    dispatch(setStats(stats));
  }

  function setPlayerListExp(el) {
    dispatch(setPlayerList(el));
  }

  function setPlayerPosExp(el) {
    dispatch(setPlayerPos(el));
  }

  function dispatchClearStatsExp() {
    dispatch(clearStats());
  }

  showStats = showStatsExp;
  setGameStats = setGameStatsExp;
  dispatchPlayerList = setPlayerListExp;
  dispatchPlayerPos = setPlayerPosExp;
  dispatchClearStats = dispatchClearStatsExp;

  function callbackFn(e) {
    handleFile(e);
  }

  function handleChange(e) {

    $(function () {

      $('.roomlist-view').animate({
        left: '-150%',
      }, { duration: 700, easing: 'swing', queue: false });

      $('#loading-screen').animate({
        left: '35vw',
      }, { duration: 700, easing: 'swing', queue: false, complete: function () { callbackFn(e) } });

    })

  }

  return (
    <>
      <div className='roomlist-view' style={{ zIndex: 5 }}>
        <div className='dialog'>
          <h1>R.Football 리플레이 분석기 v{version}</h1>
          <p><a href="https://github.com/RFootball-Replay/RFootball-Replay.github.io/issues">문제 발생 시 연락처</a><br />이곳에 해당 문제를 상세히 기술 부탁드립니다. 빠른 처리에 도움이 됩니다.<br /><a href="https://discord.gg/yeHYYHNub7">커뮤니티</a></p>
          <div className='file-btn'>
            <label htmlFor='replayfile'>
              <span style={{ float: 'left' }}>📊</span>
              <span style={{ float: 'center' }}>📀리플레이 분석</span>
            </label>
            <input id='replayfile' type='file' accept='.hbr2' data-hook='replayfile' onChange={handleChange} />
            <br /><br />
            <Changelog />
          </div>
        </div>
      </div>
      <LoadingScreen />
      {mainMode === 'stats' && <GameStats />}
    </>
  );
}

export default Home;