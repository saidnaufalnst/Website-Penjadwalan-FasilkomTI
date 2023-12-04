import {Routes, Route} from 'react-router-dom'
import { 
    Dashboard, 
    Login, 
    Register, 
    Dosen, 
    Home, 
    Kelas, 
    MataKuliah, 
    Proses, 
    AdminContent, 
    Pengampu, 
    LandingPage, 
    Reservasi, 
    Constraint,
    TambahPengampu, 
    TambahDosen, 
    TambahKelas, 
    TambahMatkul, 
    EditDosen,
    EditKelas,
    EditMatkul,
    EditPengampu,
    TambahConstraint,
    EditConstraint,
    DetailReservasi,
    ReservasiUser,
    DetailReservasiUser,
    UserContent,
    TambahReservasiUser,
    ReservasiUserAll,
    ReservasiUserPribadi,
    DetailReservasiUserPribadi,
    AccountSetting,
    TambahJadwal,
    JadwalPage,
    EditJadwal,
} from '../../pages'
import PrivateRoute from './PrivateRoute';
import UserPrivateRoute from './UserPrivateRoute';

const Routing = () => {
    return (
        <Routes>
            <Route path='/page' element={<Dashboard/>}>
                <Route path='/page/admin' element={<PrivateRoute><AdminContent/></PrivateRoute>}>
                    <Route path='/page/admin/home' element={<PrivateRoute><Home/></PrivateRoute>}/>  
                    <Route path='/page/admin/dosen' element={<PrivateRoute><Dosen/></PrivateRoute>}>
                        <Route path='/page/admin/dosen/tambah-dosen' element={<PrivateRoute><TambahDosen/></PrivateRoute>}/>
                        <Route path='/page/admin/dosen/edit-dosen/:id' element={<PrivateRoute><EditDosen/></PrivateRoute>}/>
                    </Route>  
                    <Route path='/page/admin/reservasi' element={<PrivateRoute><Reservasi/></PrivateRoute>}>
                        <Route path='/page/admin/reservasi/detail-reservasi/:id' element={<PrivateRoute><DetailReservasi/></PrivateRoute>}/>
                    </Route>  
                    <Route path='/page/admin/kelas' element={<PrivateRoute><Kelas/></PrivateRoute>}>
                        <Route path='/page/admin/kelas/tambah-kelas' element={<PrivateRoute><TambahKelas/></PrivateRoute>}/>
                        <Route path='/page/admin/kelas/edit-kelas/:id' element={<PrivateRoute><EditKelas/></PrivateRoute>}/>
                    </Route> 
                    <Route path='/page/admin/matakuliah' element={<PrivateRoute><MataKuliah/></PrivateRoute>}>
                        <Route path='/page/admin/matakuliah/tambah-mata-kuliah' element={<PrivateRoute><TambahMatkul/></PrivateRoute>}/>
                        <Route path='/page/admin/matakuliah/edit-mata-kuliah/:id' element={<PrivateRoute><EditMatkul/></PrivateRoute>}/>
                    </Route>
                    <Route path='/page/admin/proses' element={<PrivateRoute><Proses/></PrivateRoute>}>
                        <Route path='/page/admin/proses/jadwal' element={<PrivateRoute><JadwalPage/></PrivateRoute>}>
                            <Route path='/page/admin/proses/jadwal/tambah-jadwal' element={<PrivateRoute><TambahJadwal/></PrivateRoute>}/>
                            <Route path='/page/admin/proses/jadwal/edit-jadwal/:id' element={<PrivateRoute><EditJadwal/></PrivateRoute>}/>
                        </Route>
                    </Route>
                    <Route path='/page/admin/pengampu' element={<PrivateRoute><Pengampu/></PrivateRoute>}>
                        <Route path='/page/admin/pengampu/tambah-pengampu' element={<PrivateRoute><TambahPengampu/></PrivateRoute>}/>
                        <Route path='/page/admin/pengampu/edit-pengampu/:id' element={<PrivateRoute><EditPengampu/></PrivateRoute>}/>
                    </Route>
                    <Route path='/page/admin/constraint' element={<PrivateRoute><Constraint/></PrivateRoute>}>
                        <Route path='/page/admin/constraint/tambah-constraint' element={<PrivateRoute><TambahConstraint/></PrivateRoute>}/>
                        <Route path='/page/admin/constraint/edit-constraint/:id' element={<PrivateRoute><EditConstraint/></PrivateRoute>}/>
                    </Route>
                    <Route path='/page/admin/account-setting' element={<PrivateRoute><AccountSetting/></PrivateRoute>}/>
                </Route>    

                <Route path='/page/user' element={<UserPrivateRoute><UserContent/></UserPrivateRoute>}>
                    <Route path='/page/user/home' element={<UserPrivateRoute><Home/></UserPrivateRoute>}/>
                    <Route path='/page/user/reservasi' element={<UserPrivateRoute><ReservasiUser/></UserPrivateRoute>}>
                        <Route path='/page/user/reservasi/reservasi-semua' element={<UserPrivateRoute><ReservasiUserAll/></UserPrivateRoute>}>
                            <Route path='/page/user/reservasi/reservasi-semua/detail-reservasi/:id' element={<UserPrivateRoute><DetailReservasiUser/></UserPrivateRoute>}/>
                        </Route>
                        <Route path='/page/user/reservasi/reservasi-pribadi' element={<UserPrivateRoute><ReservasiUserPribadi/></UserPrivateRoute>}>
                            <Route path='/page/user/reservasi/reservasi-pribadi/tambah-reservasi' element={<UserPrivateRoute><TambahReservasiUser/></UserPrivateRoute>}/>
                            <Route path='/page/user/reservasi/reservasi-pribadi/detail-reservasi/:id' element={<UserPrivateRoute><DetailReservasiUserPribadi/></UserPrivateRoute>}/>
                        </Route>
                    </Route>  
                </Route>   
            </Route>

            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>  
            <Route path='/' element={<LandingPage/>}/>
        </Routes>
    )
}

export default Routing