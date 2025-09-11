import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from '../config/client.ts';
import { useForm } from 'react-hook-form';

type WatchListForm = {
    name: string;
};

type Show = {
    id: number;
    name: string;
    url: string;
}

type WatchList = {
    id: number;
    name: string;
    shows: Array<Show>;

}

export function WatchLists() {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [userLists, setUserLists] = useState<Array<WatchList> | null>(null);
    const [viewUserLists, setUserViewLists] = useState<boolean>(false);

    const {
        register,
        watch,
        formState: { errors },
    } = useForm<WatchListForm>({
        mode: 'onChange',
        defaultValues: {
            name: '',
        },
    });

    const list_name = watch('name');

    useEffect(() => {
        async function viewLists() {
            return await axios
                .get('/watchlist', { withCredentials: true })
                .then((res) => setUserLists(res.data))
                .catch((err) => err.message);
        }
        viewLists();
    }, []);

    // async function viewLists() {
    //     return await axios
    //         .get('/watchlist', { withCredentials: true })
    //         .then((res) => console.log(res.data))
    //         .catch((err) => err.message);
    // }

    async function newWatchList(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        return await axios
            .post('/watchlist', { list_name }, { withCredentials: true })
            .then((res) => console.log(res.data))
            .catch((err) => err.message);
    }

    const initialRows = [
        { id: 1, name: 'Severance', year: 2023 },
        { id: 2, name: 'Silo', year: 2018 },
    ];

    const columns: GridColDef<{ id: number; name: string; year: number }>[] = [
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 250,
            renderCell: (params: { value: string }) => {
                return <Button>{params.value}</Button>;
            },
        },
        { field: 'year', headerName: 'Year', width: 100 },
    ];

    const [rows, setRows] = useState(initialRows);


    return (
        <div className="register" style={{ width: '100%' }}>
            <Button onClick={() => setIsVisible(!isVisible)}>Create a watch list</Button>
            {isVisible ?
                <form
                    onSubmit={(event) => {
                        newWatchList(event);
                        setIsVisible(!isVisible);
                    }}
                >
                    <TextField
                        label="Watch list name"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        {...register('name', {
                            required: true,
                            pattern: {
                                value: /^.{0,40}$/,
                                message: 'Max 40 characters',
                            },
                        })}
                    />
                </form>
             : []
            }
            <Button onClick={() => setUserViewLists(!viewUserLists)}>viewLists</Button>
            {
                viewUserLists ?
                    (
                        <div>{userLists ? userLists[0].name : []}</div>
                    )
                    // userLists.map((list) => {
                    //     return (
                    //     <div>
                    //         <p>
                    //             '111'
                    //         </p>
                    //     </div>)
                    // })
                 : []
            }
            <DataGrid rows={rows} columns={columns} />
        </div>
    );
}
