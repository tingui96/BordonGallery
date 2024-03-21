import { Table, TableBody,TableHeader, TableColumn, Pagination ,TableRow, TableCell } from "@nextui-org/react"
import { useEffect, useState } from "react";
import { GetAllUsers } from '../services/UserService';
import { Celda } from "./Celda"
import { PageSize, columns } from "../constants/constants"
import { useListUser } from "../store/tableAdminStore";

export function TableAdmin ()
{
  const [isLoading, setIsLoading] = useState(true)
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState()
  const {users, updateUsers} = useListUser()

  useEffect(()=>{
    async function fetchListUser()
    {
      let res = await GetAllUsers(pageNumber,PageSize)
      if(res.result.statusCode === 200 || res.result.statusCode === 204)
      {
        setTotalPages(res.pagination.TotalPages)
        updateUsers(res.result.result)
        setIsLoading(false)
      }
    }
    fetchListUser()
  },[pageNumber, updateUsers])

    return (
        <Table aria-label="Example table with custom cells" shadow="lg" bottomContent={
          pageNumber > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={pageNumber}
                total={totalPages}
                onChange={(page) => setPageNumber(page)}
              />
            </div>
          ) : null
        }>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
          
        <TableBody isLoading={isLoading} items={users}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => 
                <TableCell>
                    { <Celda user={item} columnKey={columnKey}/>}
                </TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
}