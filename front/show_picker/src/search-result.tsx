import { useLocation } from 'react-router-dom';
import { IconButton, ImageList, ImageListItem, ImageListItemBar, Paper } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

export function SearchResult() {
    const location = useLocation();
    const searchResult = location.state;
    console.log(searchResult, 'Hi1');

    return (
        <Paper>
            <ImageList>
                {searchResult.map((result) => {
                    if (
                        result.qid !== undefined &&
                        (result.qid === 'movie' || result.qid === 'tvSeries') &&
                        result.i !== undefined
                    ) {
                        return (
                            <ImageListItem>
                                <img src={`${result.i.imageUrl}`} alt={'412'} />
                                <ImageListItemBar
                                    actionIcon={
                                        <IconButton>
                                            <InfoIcon aria-label={`Some text ${result.l}`} />
                                        </IconButton>
                                    }
                                />
                            </ImageListItem>
                        );
                    }
                })}
            </ImageList>
        </Paper>
    );
}
