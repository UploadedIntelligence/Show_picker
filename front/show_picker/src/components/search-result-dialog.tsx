import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import React from 'react';

type searchResultDialogProps = {
    cinemas: Array<{ cinema_name: string; cinema_url: string }> | null;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    youtubeId: string | null;
    sources: Array<{ name: string; web_url: string }> | null;
    showTitle: string | null;
    showDescription: string | null;
};

export function SearchResultDialog({
    cinemas,
    open,
    setOpen,
    youtubeId,
    sources,
    showTitle,
    showDescription,
}: searchResultDialogProps) {
    return (
        <Dialog
            sx={{ borderRadius: '10px' }}
            open={open}
            onClose={() => {
                setOpen(false);
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
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableCell>Where to watch:</TableCell>
                            <TableCell>Cinemas:</TableCell>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ padding: 0 }}>
                                    {sources ? (
                                        sources.map((source, idx) => {
                                            return (
                                                <TableRow key={idx}>
                                                    <TableCell sx={{ padding: '8px' }}>
                                                        <a href={source.web_url}>
                                                            <Button>{source.name}</Button>
                                                        </a>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    ) : (
                                        <DialogContentText>No providers found</DialogContentText>
                                    )}
                                </TableCell>
                                <TableCell sx={{ padding: 0, verticalAlign: 'top' }}>
                                    {cinemas
                                        ? cinemas.map((cinema) => {
                                              return (
                                                  <TableRow>
                                                      <TableCell>
                                                          <a href={cinema.cinema_url}>{cinema.cinema_name}</a>
                                                      </TableCell>
                                                  </TableRow>
                                              );
                                          })
                                        : []}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
        </Dialog>
    );
}
