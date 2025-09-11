import { useLocation } from 'react-router-dom';
import { ImageList, ImageListItem, ListItemButton, Paper } from '@mui/material';
import { useContext, useState } from 'react';
import {
    type IIMDBResponse,
    searchCinemaUrl,
    searchMovieGluCinemas,
    searchOMDB,
    searchWatchMode,
    searchYouTube,
} from '../api/search.ts';
import { GeoLocationContext } from '../contexts/geo-location-context.ts';
import { SearchResultDialog } from './search-result-dialog.tsx';

export function SearchResult() {
    const location = useLocation();
    const searchResult: Array<IIMDBResponse> = location.state;
    const [open, setOpen] = useState<boolean>(false);
    const [showTitle, setShowTitle] = useState<string | null>(null);
    const [showDescription, setShowDescription] = useState<string | null>(null);
    const [youtubeId, setYoutubeId] = useState<string | null>(null);
    const [sources, setSources] = useState<Array<{ name: string; web_url: string }> | null>(null);
    const [cinemas, setCinemas] = useState<Array<{ cinema_name: string; cinema_url: string }> | null>(null);
    const geoLocation = useContext(GeoLocationContext);

    async function getShowDetails(search_term: string, show_id: string, show_title: string, is_movie: boolean) {
        setSources(null);
        setYoutubeId(null);
        const show_sources: Array<{ name: string; web_url: string }> = [];
        const cinema_details: Array<{ cinema_name: string; cinema_url: string }> = [];
        const youtube_response = await searchYouTube(search_term);
        const omdb_response = await searchOMDB(show_id);
        const watchmode_response = await searchWatchMode(show_id);

        if (is_movie) {
            const movieGlu_cinemas_response = await searchMovieGluCinemas(show_title, geoLocation!);
            if (movieGlu_cinemas_response.data) {
                for (const cinema of movieGlu_cinemas_response.data) {
                    let cinema_url_response = 'Please provide location to display local cinemas airing the movie';
                    if (geoLocation) {
                        cinema_url_response = await searchCinemaUrl('vue cinema', geoLocation);
                        cinema_details.push({ cinema_name: cinema.cinema_name, cinema_url: cinema_url_response });
                    }
                }
                setCinemas(cinema_details);
            }
        }

        if (watchmode_response.data && watchmode_response.data.length > 0) {
            let known_sources: { [key: string]: number } = {};
            for (const source of watchmode_response.data) {
                if (!known_sources[source.name]) {
                    show_sources.push({ name: source.name, web_url: source.web_url });
                    known_sources[source.name] = 1;
                }
            }
            setSources(show_sources);
        }

        setYoutubeId(youtube_response.data?.items[0] ? youtube_response.data.items[0].id.videoId : 'N/A');
        setShowDescription(omdb_response.data?.Plot ? omdb_response.data.Plot : 'N/A');
    }

    return (
        <Paper>
            <ImageList cols={3}>
                {searchResult
                    ? searchResult.map((result: IIMDBResponse) => {
                          if (
                              (result.qid === 'movie' || result.qid === 'tvSeries') &&
                              result.i !== undefined &&
                              result.y !== undefined &&
                              result.s !== undefined
                          ) {
                              return (
                                  <ListItemButton
                                      key={`${result.id}`}
                                      onClick={() => {
                                          setShowTitle(result.l);
                                          getShowDetails(
                                              `${result.l} ${result.s} trailer`,
                                              result.id,
                                              result.l,
                                              result.qid === 'movie',
                                          );
                                          setOpen(true);
                                      }}
                                  >
                                      <ImageListItem>
                                          <img src={`${result.i.imageUrl}`} alt={`${result.l}`} />
                                      </ImageListItem>
                                  </ListItemButton>
                              );
                          }
                      })
                    : []
                }
            </ImageList>
            <SearchResultDialog
                open={open}
                setOpen={setOpen}
                youtubeId={youtubeId}
                sources={sources}
                cinemas={cinemas}
                showTitle={showTitle}
                showDescription={showDescription}
            />
        </Paper>
    );
}
