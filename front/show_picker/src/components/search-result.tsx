import { useLocation } from 'react-router-dom';
import {
    Button,
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
import { type AxiosResponse } from 'axios';
import { searchYouTube, searchOMDB, searchWatchMode } from '../api/search.ts';

export function SearchResult() {
    const location = useLocation();
    const searchResult = location.state;
    const [open, setOpen] = useState<boolean>(false);
    const [showTitle, setShowTitle] = useState<string | null>(null);
    const [showDescription, setShowDescription] = useState<string | null>(null);
    const [youtubeId, setYoutubeId] = useState<string | null>(null);
    const [sources, setSources] = useState<string[][] | null>(null);

    async function getImdbJSON(search_term: string, show_id: string) {
        const show_sources: string[][] = [];
        const youtube_response = await searchYouTube(search_term)
        const omdb_response: AxiosResponse<{ Plot: string }> = await searchOMDB(show_id)
        const watchmode_response: AxiosResponse<{ name: string; web_url: string }[]> = await searchWatchMode(show_id);
        console.log(watchmode_response);

        if (watchmode_response.data.length > 0) {
            for (const source of watchmode_response.data) {
                show_sources.push([source.name, source.web_url]);
            }
            setSources(show_sources);
        }

        setYoutubeId(youtube_response.data.items[0] ? youtube_response.data.items[0].id.videoId : 'N/A');
        setShowDescription(omdb_response.data.Plot ? omdb_response.data.Plot : 'N/A');
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
                                              getImdbJSON(`${result.l} ${result.s} trailer`, result.id);
                                              setOpen(true);
                                              setShowTitle(result.l);
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
                sx={{ borderRadius: '10px' }}
                open={open}
                onClose={() => {
                    setOpen(false);
                    setYoutubeId(null);
                    setSources(null);
                }}
            >
                <DialogTitle>{showTitle}</DialogTitle>
                <DialogContentText sx={{ margin: '1em' }}>{showDescription}</DialogContentText>
                <DialogContent sx={{ overflow: 'initial' }}>
                    {youtubeId ? (
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${youtubeId}`}
                            title="YouTube video player"
                            style={{ border: 'none' }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <DialogContentText>TRAILER COULD NOT BE FOUND</DialogContentText>
                    )}
                    Where to watch:
                    {sources ? (
                        sources.map((source) => {
                            return (
                                <a href={source[1]}>
                                    <br />
                                    <Button>{source[0]}</Button>
                                </a>
                            );
                        })
                    ) : (
                        <DialogContentText>No providers found</DialogContentText>
                    )}
                </DialogContent>
            </Dialog>
        </Paper>
    );
}
