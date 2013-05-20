<?php
/*
 GaiaEHR (Electronic Health Records)
 Navigation.php
 Navigation dataProvider
 Copyright (C) 2012 Ernesto J. Rodriguez (Certun)

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
if(!isset($_SESSION)){
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
include_once ($_SESSION['root'] . '/dataProvider/ACL.php');
class Navigation
{
    /**
     * @var \ACL
     */
    private $ACL;
    private $i18n;
    private $t;

    function __construct()
    {
        include_once ($_SESSION['root'] . '/langs/' . $_SESSION['site']['localization'] . '.php');
        $this->ACL  = new ACL();
        $this->i18n = $LANG;
    }

    public function getNavigation()
    {
        // *************************************************************************************
        // Renders the items of the navigation panel
        // Default Nav Data
        // *************************************************************************************
        $nav = array(
            array(
                'text' => $this->i18n['dashboard'], 'disabled' => ($this->ACL->hasPermission('access_dashboard') ? false : true), 'leaf' => true, 'cls' => 'file', 'iconCls' => 'icoDash', 'id' => 'panelDashboard'
                /*			), array(
                                'text' => $this->i18n['calendar'], 'disabled' => ($this->ACL->hasPermission('access_calendar') ? false : true), 'leaf' => true, 'cls' => 'file', 'iconCls' => 'icoCalendar', 'id' => 'panelCalendar'
                /*			), array(
                                'text' => $this->i18n['messages'], 'disabled' => ($this->ACL->hasPermission('access_messages') ? false : true), 'leaf' => true, 'cls' => 'file', 'iconCls' => 'mail', 'id' => 'panelMessages'
                */		//	)
                //, array(
                //		'text' => $this->i18n['patient_search'], 'disabled' => ($this->ACL->hasPermission('access_patient_search') ? false : true), 'leaf' => true, 'cls' => 'file', 'iconCls' => 'searchUsers', 'id' => 'panelPatientSearch'
                /*			), array(
                                'text' => $this->i18n['area_floor_plan'], 'disabled' => false, 'leaf' => true, 'cls' => 'file', 'iconCls' => 'icoZoneAreas', 'id' => 'panelAreaFloorPlan'
                            ), array(
                                'text' => $this->i18n['patient_pool_areas'], 'disabled' => false, 'leaf' => true, 'cls' => 'file', 'iconCls' => 'icoPoolArea16', 'id' => 'panelPoolArea'
                */
            )
        );
        // *************************************************************************************
        // Patient Folder
        // *************************************************************************************
        /*
                $master = array(
                    'text' => $this->i18n['master'], 'cls' => 'folder', 'expanded' => true, 'id' => 'navigationMaster'
                );
                if($this->ACL->hasPermission('access_gloabal_settings')){
                    $master['children'][] = array(
                        'text' => $this->i18n['master_category'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelGlobals'
                    );

                }
        /*
                if($this->ACL->hasPermission('access_patient_summary')){
                    $patient['children'][] = array(
                        'text' => $this->i18n['patient_summary'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelSummary'
                    );
                }
                if($this->ACL->hasPermission('access_patient_visits')){
                    $patient['children'][] = array(
                        'text' => $this->i18n['visits_history'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelVisits'
                    );
                }
                if($this->ACL->hasPermission('access_encounters')){
                    $patient['children'][] = array(
                        'text' => $this->i18n['encounter'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelEncounter'
                    );
                }
                if($this->ACL->hasPermission('access_visit_checkout')){
                    $patient['children'][] = array(
                        'text' => $this->i18n['visit_checkout'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelVisitCheckout'
                    );
                }
        */
//		array_push($nav, $patient);
//		array_push($nav, $master);

        // *************************************************************************************
        // Billing Manager Folder
        // *************************************************************************************
        array_push($nav, array(
            'text' => $this->i18n['master_manager'], 'cls' => 'folder', 'expanded' => true, 'id' => 'navigationMaster', 'children' => array(
                array(
                    'text' => $this->i18n['company'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelCompany'
                ), array(
                    'text' => $this->i18n['bentuk'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelBentuk'
                ), array(
                    'text' => $this->i18n['bahanbaku'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelBahanBaku'
                ), array(
                    'text' => $this->i18n['kemasan'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelKemasan'
                ), array(
                    'text' => $this->i18n['jenis'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelJenis'
                ), array(
                    'text' => $this->i18n['satuan'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelSatuan'
                ), array(
                    'text' => $this->i18n['spesifikasi'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelSpesifikasi'
                ), array(
                    'text' => $this->i18n['items'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelItems'
                ), array(
                    'text' => $this->i18n['formula'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelFormula'
                ), array(
                    'text' => $this->i18n['customer'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelCustomer'
                ), array(
                    'text' => $this->i18n['vendor'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelVendor'
                ), array(
                    'text' => $this->i18n['salesman'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelSalesman'
                ), array(
                    'text' => $this->i18n['wilayah'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelWilayah'
                ), array(
                    'text' => $this->i18n['route'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelRoute'
                ),array(
                    'text' => $this->i18n['factory'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelFactlocation'
                )
            )
        ));

        array_push($nav, array(
            'text' => $this->i18n['transaksi'], 'cls' => 'folder', 'expanded' => true, 'id' => 'navigationTransaksi', 'children' => array(
                array(
                    'text' => $this->i18n['salesorder'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelSO'
                ), array(
                    'text' => $this->i18n['releaseorder'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelRO'
                ), array(
                    'text' => $this->i18n['produksi'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelProduksi'
                ), array(
                    'text' => $this->i18n['purchaseorder'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelPO'
                ), array(
                    'text' => $this->i18n['goodsreceived'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelGR'
                ), array(
                    'text' => $this->i18n['goodsissued'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelGI'
                ), array(
                    'text' => $this->i18n['workorder'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelWO'
                ), array(
                    'text' => $this->i18n['stock'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelStock'
                )
            )
        ));

        // *************************************************************************************
        // Report Folder
        // *************************************************************************************
        $report = array(
            'text' => $this->i18n['report'], 'cls' => 'folder', 'expanded' => true, 'id' => 'navigationReport'
        );
//		if($this->ACL->hasPermission('access_gloabal_settings')){
        $report['children'][] = array(
            'text' => $this->i18n['reportpanel'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelReportPanel'
        );

        array_push($nav, $report);

        // *************************************************************************************
        // Administration Folder
        // *************************************************************************************
        $admin = array(
            'text' => $this->i18n['administration'], 'cls' => 'folder', 'expanded' => true, 'id' => 'navigationAdministration'
        );
//		if($this->ACL->hasPermission('access_gloabal_settings')){
        $admin['children'][] = array(
            'text' => $this->i18n['global_settings'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelGlobals'
        );
//		}
        /*		if($this->ACL->hasPermission('access_facilities')){
                    $admin['children'][] = array(
                        'text' => $this->i18n['facilities'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelFacilities'
                    );
                }
        */
// 		if($this->ACL->hasPermission('access_users')){
        $admin['children'][] = array(
            'text' => $this->i18n['users'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelUsers'
        );
//		}
        /*
                if($this->ACL->hasPermission('access_practice')){
                    $admin['children'][] = array(
                        'text' => $this->i18n['practice'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelPractice'
                    );
                }
                if($this->ACL->hasPermission('access_data_manager')){
                    $admin['children'][] = array(
                        'text' => $this->i18n['data_manager'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelDataManager'
                    );
                }
                if($this->ACL->hasPermission('access_preventive_care')){
                    $admin['children'][] = array(
                        'text' => $this->i18n['preventive_care'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelPreventiveCare'
                    );
                }
        //		if($this->ACL->hasPermission('access_medications')){
        //			$admin['children'][] = array(
        //				'text' => $this->i18n['medications'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelMedications'
        //			);
        //		}
                if($this->ACL->hasPermission('access_floor_plans')){
                    $admin['children'][] = array(
                        'text' => $this->i18n['floor_areas'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelFloorPlans'
                    );
                }

                if($this->ACL->hasPermission('access_roles')){
                    $admin['children'][] = array(
                        'text' => $this->i18n['roles'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelRoles'
                    );
                }

                if($this->ACL->hasPermission('access_layouts')){
                    $admin['children'][] = array(
                        'text' => $this->i18n['layouts'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelLayout'
                    );
                }
                if($this->ACL->hasPermission('access_lists')){
                    $admin['children'][] = array(
                        'text' => $this->i18n['lists'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelLists'
                    );
                }
                if($this->ACL->hasPermission('access_event_log')){
                    $admin['children'][] = array(
                        'text' => $this->i18n['event_log'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelLog'
                    );
                }
                if($this->ACL->hasPermission('access_documents')){
                    $admin['children'][] = array(
                        'text' => $this->i18n['documents'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelDocuments'
                    );
                }
                //if($this->ACL->hasPermission('access_documents')){
                $admin['children'][] = array(
                    'text' => $this->i18n['external_data_loads'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelExternalDataLoads'
                );
                //if($this->ACL->hasPermission('access_documents')){
                $admin['children'][] = array(
                    'text' => $this->i18n['applications'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelApplications'
                );
                //}

                if($this->ACL->hasPermission('access_documents')){
                $admin['children'][] = array(
                    'text' => $this->i18n['modules'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelModules'
                    );
                }
        */
//		if($this->ACL->hasPermission('access_gloabal_settings')
//		|| $this->ACL->hasPermission('access_users')
//		|| $this->ACL->hasPermission('access_roles'))
        array_push($nav, $admin);

        // *************************************************************************************
        // Miscellaneous Folder
        // *************************************************************************************
        array_push($nav, array(
            'text' => $this->i18n['miscellaneous'], 'cls' => 'folder', 'expanded' => true, 'id' => 'navigationMiscellaneous', 'children' => array(
                /*				array(
                                    'text' => $this->i18n['web_search'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelWebsearch'
                                ), array(
                                    'text' => $this->i18n['address_book'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelAddressbook'
                                ), array(
                                    'text' => $this->i18n['office_notes'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelOfficeNotes'
                                ), array(
                                    'text' => $this->i18n['my_settings'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelMySettings'
                                ),
                 */
                array('text' => $this->i18n['my_account'], 'leaf' => true, 'cls' => 'file', 'id' => 'panelMyAccount'
                )
            )
        ));
        return $nav;

    }

}