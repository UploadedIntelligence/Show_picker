import { useLocation } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    ImageList,
    ImageListItem,
    ListItemButton,
    Paper,
} from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

export function SearchResult() {
    const location = useLocation();
    const searchResult = location.state;
    const [open, setOpen] = useState<boolean>(false);
    const [movieTitle, setMovieTitle] = useState<string | null>(null);
    const [youtubeId, setYoutubeId] = useState<string | null>(null);

    async function getImdbJSON(search_term: string) {
        const youtube_response = await axios.get(`http://localhost:9000/youtube/${search_term}`);
        setYoutubeId(youtube_response.data.items[0].id.videoId);
    }

    // ;
    return (
        <Paper>
            <ImageList cols={3}>
                {searchResult
                    ? searchResult.map(
                          (result: {
                              id: string;
                              qid: string;
                              i: { imageUrl: string };
                              l: string;
                              y: number | undefined;
                              s: string;
                          }) => {
                              if (
                                  (result.qid === 'movie' || result.qid === 'tvSeries') &&
                                  result.i !== undefined &&
                                  result.y !== undefined &&
                                  result.s !== undefined
                              ) {
                                  return (
                                      <ListItemButton
                                          key={`${result.id}`}
                                          onClick={async () => {
                                              getImdbJSON(`${result.l} ${result.s} trailer`);
                                              setOpen(true);
                                              setMovieTitle(result.l);
                                          }}
                                      >
                                          <ImageListItem>
                                              <img src={`${result.i.imageUrl}`} alt={`${result.l}`} />
                                          </ImageListItem>
                                      </ListItemButton>
                                  );
                              }
                          },
                      )
                    : null}
            </ImageList>
            <Dialog
                open={open}
                onClose={() => {
                    setOpen(false);
                    setYoutubeId(null);
                }}
            >
                <DialogTitle>{movieTitle}</DialogTitle>
                <DialogContentText>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolore exercitationem illum neque
                    omnis repellendus voluptates. Aliquam aliquid aperiam debitis mollitia placeat possimus reiciendis
                    sit, vel veritatis! Aliquid amet cupiditate distinctio doloremque explicabo incidunt iusto mollitia,
                    nihil non quae, repellendus repudiandae, vero? Ad assumenda dolores ipsa quae quos repellendus
                    veniam?
                </DialogContentText>
                <DialogContent>
                    {youtubeId ? (
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${youtubeId}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <DialogContentText>TRAILER COULD NOT BE FOUND</DialogContentText>
                    )}
                </DialogContent>
            </Dialog>
        </Paper>
    );
}
