import { useLocation } from 'react-router-dom';
import { Dialog, DialogContent, ImageList, ImageListItem, ListItemButton, Paper } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

export function SearchResult() {
    const location = useLocation();
    const searchResult = location.state;
    const [open, setOpen] = useState<boolean>(false);
    const [searchDefault, setSearchDefault] = useState<string | null>(null);
    const boxRef = useRef(null);

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                window.google.search.cse.element.render({
                    div: 'google-search-box',
                    tag: 'search',
                });
                const input = document.querySelector('input.gsc-input') as HTMLInputElement;
                input.value = searchDefault!;
                input.focus();
            }, 0);
        }
    }, [open]);

    return (
        <Paper>
            <script async src="https://cse.google.com/cse.js?cx=f331270bd9b814774"></script>
            <ImageList cols={3}>
                {searchResult
                    ? searchResult.map(
                          (result: {
                              id: string;
                              qid: string;
                              i: { imageUrl: string };
                              l: string;
                              y: number | undefined;
                          }) => {
                              if ((result.qid === 'movie' || result.qid === 'tvSeries') && result.i !== undefined) {
                                  return (
                                      <ListItemButton
                                          key={`${result.id}`}
                                          onClick={async () => {
                                              setOpen(true);
                                              setSearchDefault(result.l + ` ${result.y}` + ' trailer');
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
                }}
            >
                <DialogContent>
                    <div id="google-search-box" ref={boxRef}></div>
                </DialogContent>
            </Dialog>
        </Paper>
    );
}
