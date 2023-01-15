import { configureStore } from "@reduxjs/toolkit";
import MainSlice from "./slices/MainSlice";
import MapSlice from "./slices/MapSlice";
import ThemeSlice from "./slices/ThemeSlice";
import MapAddSlice from "./slices/MapAddSlice";
import SidebarSlice from "./slices/SidebarSlice";
import NavbarSlice from "./slices/NavbarSlice";

/** 게시판 */
import BulletinSlice from "./slices/bulletin/BulletinSlice";
import RecommendPlaceSlice from "./slices/bulletin/RecommendPlaceSlice";
import HashtagSlice from "./slices/bulletin/HashtagSlice";
import PostViewSlice from './slices/bulletin/PostViewSlice';

import MapFinderSlice from "./slices/MapFinderSlice";

import InfoSlice from "./slices/InfoSlice";
import MyPageSlice from "./slices/MyPageSlice";
import InterestSlice from "./slices/InterestSlice";

const store = configureStore({
  reducer: {
    MainSlice: MainSlice,
    MapSlice: MapSlice,
    ThemeSlice: ThemeSlice,
    MapAddSlice: MapAddSlice,
    SidebarSlice: SidebarSlice,
    NavbarSlice: NavbarSlice,

    /** 게시판 */
    BulletinSlice: BulletinSlice,
    RecommendPlaceSlice: RecommendPlaceSlice,
    HashtagSlice: HashtagSlice,
    PostViewSlice: PostViewSlice,

    MapFinderSlice: MapFinderSlice,

    /** 마이페이지 */
    InfoSlice: InfoSlice,
    MyPageSlice: MyPageSlice,
    InterestSlice: InterestSlice,
  },
});

export default store;
