import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "scenes/nav-bar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import CreatePostWidget from "scenes/widgets/CreatePostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const Profile = () => {
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();
        setUser(data);
    }

    const loggedInUserId = useSelector((state) => state.user._id);

    useEffect(() => {
        getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!user) {
        return null;
    }

    return (
        <Box>
            <NavBar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreen ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box
                    flexBasis={isNonMobileScreen ? "26%" : undefined}
                >
                    <UserWidget
                        userId={userId}
                        picturePath={user.picturePath}
                    />
                    <Box m="2rem 0">
                        <FriendListWidget userId={userId} />
                    </Box>
                </Box>
                <Box
                    flexBasis={isNonMobileScreen ? "42%" : undefined}
                    mt={isNonMobileScreen ? undefined : "2rem"}
                >
                    {userId === loggedInUserId && (
                        <CreatePostWidget picturePath={user.picturePath} />
                    )}
                    <PostsWidget userId={userId} isUserProfile />
                </Box>
            </Box>
        </Box>
    )
}

export default Profile;