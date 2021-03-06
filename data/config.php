<?php
$API = array(
    'Modules' => array(
        'methods' => array(
            'getAllModules' => array(
                'len' => 0
            ),
            'getActiveModules' => array(
                'len' => 0
            ),
            'getEnabledModules' => array(
                'len' => 0
            ),
            'getDisabledModules' => array(
                'len' => 0
            ),
            'getModuleByName' => array(
                'len' => 1
            ),
            'updateModule' => array(
                'len' => 1
            )
        )
    ),
    /**
     * Globals Functions
     */
    'Globals' => array(
        'methods' => array(
            'setGlobals' => array(
                'len' => 0
            ),
            'getGlobals' => array(
                'len' => 0
            ),
            'getAllGlobals' => array(
                'len' => 0
            ),
            'updateGlobals' => array(
                'len' => 1
            )
        )
    ),
    /**
     * User Functions
     */
    'User' => array(
        'methods' => array(
            'getUsers' => array(
                'len' => 1
            ),
            'getCurrentUserData' => array(
                'len' => 0
            ),
            'addUser' => array(
                'len' => 1
            ),
            'updateUser' => array(
                'len' => 1
            ),
            'chechPasswordHistory' => array(
                'len' => 1
            ),
            'changeMyPassword' => array(
                'len' => 1
            ),
            'updateMyAccount' => array(
                'len' => 1
            ),
            'verifyUserPass' => array(
                'len' => 1
            ),
            'getProviders' => array(
                'len' => 1
            ),
            'getCurrentUserBasicData' => array(
                'len' => 0
            ),
            'getCurrentActiveCompany' => array(
                'len' => 1
            )
        )
    ),
    /**
     * Authorization Procedures Functions
     */
    'authProcedures' => array(
        'methods' => array(
            'login' => array(
                'len' => 1
            ),
            'ckAuth' => array(
                'len' => 0
            ),
            'unAuth' => array(
                'len' => 0
            ),
            'getSites' => array(
                'len' => 0
            )
        )
    ),
    /**
     * Navigation Function
     */
    /**
     * Navigation Function
     */
    'CombosData' => array(
        'methods' => array(
            'getUsers' => array(
                'len' => 0
            ),
            'getRoles' => array(
                'len' => 0
            ),
            'getThemes' => array(
                'len' => 0
            )
        )),
    'Navigation' => array(
        'methods' => array(
            'getNavigation' => array(
                'len' => 0
            )
        )
    ),
    'Roles' => array(
        'methods' => array(
            'getRoleForm' => array(
                'len' => 1
            ),
            'getRolesData' => array(
                'len' => 0
            ),
            'saveRolesData' => array(
                'len' => 1
            )
        )
    ),
    'Role' => array(
        'methods' => array(
            'hasRolePerms' => array(
                'len' => 0
            ),
            'getRole' => array(
                'len' => 1
            ),
            'addRole' => array(
                'len' => 1
            ),
            'updateRole' => array(
                'len' => 1
            ),
            'deleteRole' => array(
                'len' => 1
            ),
            'getPermissions' => array(
                'len' => 1
            ),
            'addPermissions' => array(
                'len' => 1
            ),
            'updatePermissions' => array(
                'len' => 1
            ),
            'deletePermissions' => array(
                'len' => 1
            ),
            'getRolePermissions' => array(
                'len' => 1
            ),
            'addRolePermissions' => array(
                'len' => 1
            ),
            'updateRolePermissions' => array(
                'len' => 1
            ),
            'deleteRolePermissions' => array(
                'len' => 1
            ),
            'getUserPermissions' => array(
                'len' => 1
            ),
            'addUserPermissions' => array(
                'len' => 1
            ),
            'updateUserPermissions' => array(
                'len' => 1
            ),
            'deleteUserPermissions' => array(
                'len' => 1
            )
        )
    ),
    /**
     * Navigation Function
     */
    'ACL' => array(
        'methods' => array(
            'getAllUserPermsAccess' => array(
                'len' => 0
            ),
            'hasPermission' => array(
                'len' => 1
            )
        )
    ),
    /**
     * Navigation Function
     */
    'Logs' => array(
        'methods' => array(
            'getLogs' => array(
                'len' => 1
            )
        )
    ),
    'CronJob' => array(
        'methods' => array(
            'run' => array(
                'len' => 0
            )
        )
    ),
    'i18nRouter' => array(
        'methods' => array(
            'getTranslation' => array(
                'len' => 0
            ),
            'getDefaultLanguage' => array(
                'len' => 0
            ),
            'getAvailableLanguages' => array(
                'len' => 0
            )
        )
    ),
    'SiteSetup' => array(
        'methods' => array(
            'checkDatabaseCredentials' => array(
                'len' => 1
            ),
            'checkRequirements' => array(
                'len' => 0
            ),
            'setSiteDirBySiteId' => array(
                'len' => 1
            ),
            'createDatabaseStructure' => array(
                'len' => 1
            ),
            'loadDatabaseData' => array(
                'len' => 1
            ),
            'createSiteAdmin' => array(
                'len' => 1
            ),
            'createSConfigurationFile' => array(
                'len' => 1
            ),
            'loadCode' => array(
                'len' => 1
            )
        )
    ),
    'Applications' => array(
        'methods' => array(
            'getApplications' => array(
                'len' => 1
            ),
            'addApplication' => array(
                'len' => 1
            ),
            'updateApplication' => array(
                'len' => 1
            ),
            'deleteApplication' => array(
                'len' => 1
            )
        )
    ),
    /**
     * Companies Functions
     */
    'Companies' => array(
        'methods' => array(
            'getCompanies' => array(
                'len' => 1
            ),
            'addCompany' => array(
                'len' => 1
            ),
            'updateCompany' => array(
                'len' => 1
            ),
            'deleteCompany' => array(
                'len' => 1
            ),
            'deleteCompanybyID' => array(
                'len' => 1
            )
        )
    ),
    /**
     * Bahan Baku Functions
     */
    'BahanBaku' => array(
        'methods' => array(
            /* 'getbbLiveSearch' => array(
                 'len' => 1
             ),
             'getbsLiveSearch' => array(
                 'len' => 1
             ),*/
            'getbb' => array(
                'len' => 1
            ),
            'addbb' => array(
                'len' => 1
            ),
            'updatebb' => array(
                'len' => 1
            ),
            'deletebb' => array(
                'len' => 1
            )
        )
    ),
    /**
     * Jenis Functions
     */
    'Kemasan' => array(
        'methods' => array(
            /*'getKemasanLiveSearch' => array(
                'len' => 1
            ),*/
            'getkemasan' => array(
                'len' => 1
            ),
            'addkemasan' => array(
                'len' => 1
            ),
            'updatekemasan' => array(
                'len' => 1
            ),
            'deletekemasan' => array(
                'len' => 1
            )
        )
    ),
    /**
     * Jenis Functions
     */
    'Jenis' => array(
        'methods' => array(
            /*'getJenisLiveSearch' => array(
                'len' => 1
            ),*/
            'getjenis' => array(
                'len' => 1
            ),
            'addjenis' => array(
                'len' => 1
            ),
            'updatejenis' => array(
                'len' => 1
            ),
            'deletejenis' => array(
                'len' => 1
            )
        )
    ),
    /**
     * Satuan Functions
     */
    'Satuan' => array(
        'methods' => array(
            /*'getSatuanLiveSearch' => array(
                'len' => 1
            ),*/
            'getsatuan' => array(
                'len' => 1
            ),
            'addsatuan' => array(
                'len' => 1
            ),
            'updatesatuan' => array(
                'len' => 1
            ),
            'deletesatuan' => array(
                'len' => 1
            )
        )
    ),
    /**
     * Satuan Functions
     */
    'Items' => array(
        'methods' => array(
            /* 'getItemsLiveSearch' => array(
                 'len' => 1
             ),*/
            'getitems' => array(
                'len' => 1
            ),
            'additems' => array(
                'len' => 1
            ),
            'updateitems' => array(
                'len' => 1
            ),
            'deleteitems' => array(
                'len' => 1
            ),
            'getprice' => array(
                'len' => 1
            ),
            'addprice' => array(
                'len' => 1
            ),
            'updateprice' => array(
                'len' => 1
            ),
            'ProductListSearch' => array(
                'len' => 1
            )
        )
    ),
    /**
     * Customer Functions
     */
    'Customer' => array(
        'methods' => array(
            'getcustomer' => array(
                'len' => 1
            ),
            'addcustomer' => array(
                'len' => 1
            ),
            'updatecustomer' => array(
                'len' => 1
            ),
            'deletecustomer' => array(
                'len' => 1
            ),
            'getCustLoc' => array(
                'len' => 1
            ),
            'addCustLoc' => array(
                'len' => 1
            ),
            'updateCustLoc' => array(
                'len' => 1
            ),
            'deleteCustLoc
            ' => array(
                'len' => 1
            )
        )
    ),
    /**
     * spesifikasi Functions
     */
    'Spesifikasi' => array(
        'methods' => array(
            /*'getSpesifikasiLiveSearch' => array(
                'len' => 1
            ),*/
            'getspesifikasi' => array(
                'len' => 1
            ),
            'addspesifikasi' => array(
                'len' => 1
            ),
            'updatespesifikasi' => array(
                'len' => 1
            ),
            'deletespesifikasi' => array(
                'len' => 1
            )
        )
    ),
    /**
     * vendor Functions
     */
    'Vendor' => array(
        'methods' => array(
            /*'getVendorLiveSearch' => array(
                'len' => 1
            ),*/
            'getvendor' => array(
                'len' => 1
            ),
            'addvendor' => array(
                'len' => 1
            ),
            'updatevendor' => array(
                'len' => 1
            ),
            'deletevendor' => array(
                'len' => 1
            )
        )
    ),
    /**
     * Bentuk Functions
     */
    'Bentuk' => array(
        'methods' => array(
            /*'getBentukLiveSearch' => array(
                'len' => 1
            ),*/
            'getBentuk' => array(
                'len' => 1
            ),
            'addBentuk' => array(
                'len' => 1
            ),
            'updateBentuk' => array(
                'len' => 1
            ),
            'deleteBentuk' => array(
                'len' => 1
            )
        )
    ),
    /**
     * Formula Functions
     */
    'Formula' => array(
        'methods' => array(
            /* 'getFormulaLiveSearch' => array(
                 'len' => 1
             ),*/
            'getformula' => array(
                'len' => 1
            ),
            'addformula' => array(
                'len' => 1
            ),
            'updateformula' => array(
                'len' => 1
            ),
            'deleteformula' => array(
                'len' => 1
            ),
            'getformula1' => array(
                'len' => 1
            ),
            'addformula1' => array(
                'len' => 1
            ),
            'updateformula1' => array(
                'len' => 1
            ),
            'deleteformula1' => array(
                'len' => 1
            )
        )
    ),

    /**
     * Salesman Functions
     */
    'Salesman' => array(
        'methods' => array(
            /*'getSalesmanLiveSearch' => array(
                'len' => 1
            ),*/
            'getsalesman' => array(
                'len' => 1
            ),
            'addsalesman' => array(
                'len' => 1
            ),
            'updatesalesman' => array(
                'len' => 1
            ),
            'deletesalesman' => array(
                'len' => 1
            )
        )
    ),
    /**
     * Wilayah Functions
     */
    'Wilayah' => array(
        'methods' => array(
            /*'getWilayahLiveSearch' => array(
                'len' => 1
            ),*/
            'getwilayah' => array(
                'len' => 1
            ),
            'addwilayah' => array(
                'len' => 1
            ),
            'updatewilayah' => array(
                'len' => 1
            ),
            'deletewilayah' => array(
                'len' => 1
            ),
            'getsaleswil' => array(
                'len' => 1
            ),
            'addsaleswil' => array(
                'len' => 1
            ),
            'updatesaleswil' => array(
                'len' => 1
            ),
            'deletesaleswil' => array(
                'len' => 1
            )
        )
    ),

    /**
     * Sales Order Functions
     */
    'SalesOrder' => array(
        'methods' => array(
            'getFilterSOData' => array(
                'len' => 1
            ),
            'addSO' => array(
                'len' => 1
            ),
            'updateSO' => array(
                'len' => 1
            ),
            'deleteSO' => array(
                'len' => 1
            ),
            'deletebyso_num' => array(
                'len' => 1
            ),
            'getSOItems' => array(
                'len' => 1
            ),
            'addSOItems' => array(
                'len' => 1
            ),
            'updateSOItems' => array(
                'len' => 1
            ),
            'deleteSOItems' => array(
                'len' => 1
            ),
            'getSOLocation' => array(
                'len' => 1
            ),
            'addSOLocation' => array(
                'len' => 1
            ),
            'updateSOLocation' => array(
                'len' => 1
            ),
            'deleteSOLocation' => array(
                'len' => 1
            ),
            'updateSOnetto' => array(
                'len' => 1
            ),
            'getSOLoc' => array(
                'len' => 1
            ),
            'updateSOLoc' => array(
                'len' => 1
            )
        )
    ),
    /**
     * Purchase Order Functions
     */
    'PurchaseOrder' => array(
        'methods' => array(
            'getFilterPOData' => array(
                'len' => 1
            ),
            'addPO' => array(
                'len' => 1
            ),
            'updatePO' => array(
                'len' => 1
            ),
            'deletePO' => array(
                'len' => 1
            ),
            'getPOItems' => array(
                'len' => 1
            ),
            'addPOItems' => array(
                'len' => 1
            ),
            'updatePOItems' => array(
                'len' => 1
            ),
            'deletePOItems' => array(
                'len' => 1
            )
        )
    ),
    /**
     * Goods Received Functions
     */
    'GoodsReceived' => array(
        'methods' => array(
            'getFilterGRData' => array(
                'len' => 1
            ),
            'addGR' => array(
                'len' => 1
            ),
            'updateGR' => array(
                'len' => 1
            ),'postingGR' => array(
                'len' => 1
            ),
            'deleteGR' => array(
                'len' => 1
            ),
            'getGRItems' => array(
                'len' => 1
            ),
            'addGRItems' => array(
                'len' => 1
            ),
            'updateGRItems' => array(
                'len' => 1
            ),
            'deleteGRItems' => array(
                'len' => 1
            ),
            'getGRDetail' => array(
                'len' => 1
            ),
            'addGRDetail' => array(
                'len' => 1
            ),
            'updateGRDetail' => array(
                'len' => 1
            ),
            'deleteGRDetail' => array(
                'len' => 1
            )
        )
    ),
    /**
     * Goods Issued Functions
     */
    /*'GoodsIssued' => array(
        'methods' => array(
            'getFilterGIData' => array(
                'len' => 1
            ),
            'addGI' => array(
                'len' => 1
            ),
            'updateGI' => array(
                'len' => 1
            ),
            'deleteGI' => array(
                'len' => 1
            ),
            'deletebygi_num' => array(
                'len' => 1
            ),
            'getGIItems' => array(
                'len' => 1
            ),
            'addGIItems' => array(
                'len' => 1
            ),
            'updateGIItems' => array(
                'len' => 1
            ),
            'deleteGIItems' => array(
                'len' => 1
            ),
            'getGIDetail' => array(
                'len' => 1
            ),
            'addGIDetail' => array(
                'len' => 1
            ),
            'updateGIDetail' => array(
                'len' => 1
            ),
            'deleteGIDetail' => array(
                'len' => 1
            )
        )
    ),*/
    /**
     * Goods Issued Functions
     */
    /*'WorkOrder' => array(
        'methods' => array(
            'getFilterWOData' => array(
                'len' => 1
            ),
            'addWO' => array(
                'len' => 1
            ),
            'updateWO' => array(
                'len' => 1
            ),
            'deleteWO' => array(
                'len' => 1
            ),
            'deletebywo_num' => array(
                'len' => 1
            ),
            'getWObb' => array(
                'len' => 1
            ),
            'addWObb' => array(
                'len' => 1
            ),
            'updateWObb' => array(
                'len' => 1
            ),
            'deleteWObb' => array(
                'len' => 1
            ),
            'getWOItems' => array(
                'len' => 1
            ),
            'addWOItems' => array(
                'len' => 1
            ),
            'updateWOItems' => array(
                'len' => 1
            ),
            'deleteWOItems' => array(
                'len' => 1
            )
        )
    ),*/
    'Route' => array(
        'methods' => array(
            'getRoute' => array(
                'len' => 1
            ),
            'addRoute' => array(
                'len' => 1
            ),
            'updateRoute' => array(
                'len' => 1
            ),
            'deleteRoute' => array(
                'len' => 1
            ), 'getRouteD' => array(
                'len' => 1
            ),
            'addRouteD' => array(
                'len' => 1
            ),
            'updateRouteD' => array(
                'len' => 1
            ),
            'deleteRouteD' => array(
                'len' => 1
            )
        )
    ),
    'ReleaseOrder' => array(
        'methods' => array(
            'updateReleaseOrder' => array(
                'len' => 1
            ),'getReleaseOrder' => array(
                'len' => 1
            ),'updateReleaseOrderCancel' => array(
                'len' => 1
            ),'getReleaseOrderCancel' => array(
                'len' => 1
            ),'getRCL' => array(
                'len' => 1
            ),'updateRCL' => array(
                'len' => 1
            )
        )
    ),
    'WorkOrder1' => array(
        'methods' => array(
            'getWorkOrder1' => array(
                'len' => 1
            ),
            'updateWorkOrder1' => array(
                'len' => 1
            ),'getWorkOrder1Detail' => array(
                'len' => 1
            ),'addWorkOrder1Detail' => array(
                'len' => 1
            ),'updateWorkOrder1Detail' => array(
                'len' => 1
            ),'deleteWorkOrder1Detail' => array(
                'len' => 1
            ),'getWorkOrder1DetailBBaku' => array(
                'len' => 1
            ),'addWorkOrder1DetailBBaku' => array(
                'len' => 1
            ),'updateWorkOrder1DetailBBaku' => array(
                'len' => 1
            ),'deleteWorkOrder1DetailBBaku' => array(
                'len' => 1
            ),'getWorkOrder1DetailBJadi' => array(
                'len' => 1
            ),'addWorkOrder1DetailBJadi' => array(
                'len' => 1
            ),'updateWorkOrder1DetailBJadi' => array(
                'len' => 1
            ),'deleteWorkOrder1DetailBJadi' => array(
                'len' => 1
            ),'getGudanglocation' => array(
                'len' => 1
            ),'getWODetailBBdalamproses' => array(
            'len' => 1
            ),'addWODetailBBdalamproses' => array(
                'len' => 1
            ),'addWO_NoFormula' => array(
                'len' => 1
            ),'deleteWO_NoFormula' => array(
                'len' => 1
            ),'updateWO_NoFormula' => array(
                'len' => 1
            )
        )
    ),
    'Produksi' => array(
        'methods' => array(
            'getProduksi' => array(
                'len' => 1
            ),
            'addProduksi' => array(
                'len' => 1
            ),
            'updateProduksi' => array(
                'len' => 1
            ),
            'deleteProduksi' => array(
                'len' => 1
            ), 'getProduksi1' => array(
                'len' => 1
            ),
            'addProduksi1' => array(
                'len' => 1
            ),
            'updateProduksi1' => array(
                'len' => 1
            ),
            'deleteProduksi1' => array(
                'len' => 1
            ),
            'getSOpopup' => array(
                'len' => 1
            ),
            'getFormulapopup'=> array(
                'len' => 1
            ),
            'getProduksiCancel' => array(
                'len' => 1
            ),
            'updateProduksiCancel'=> array(
                'len' => 1
            )
        )
    ),
    'StockPeriode' => array(
        'methods' => array(
            'getStock' => array(
                'len' => 1
            )
        )
    ),

    'Factory_location' => array(
        'methods' => array(
            'getFactorylocation' => array(
                'len' => 1
            ),
            'addFactorylocation' => array(
                'len' => 1
            ),
            'updateFactorylocation' => array(
                'len' => 1
            ),
            'deleteFactorylocation' => array(
                'len' => 1
            ),'getGudanglocation' => array(
                'len' => 1
            ),
            'addGudanglocation' => array(
                'len' => 1
            ),
            'updateGudanglocation' => array(
                'len' => 1
            ),
            'deleteGudanglocation' => array(
                'len' => 1
            )
        )
    ),
    'DeliveryOrder' => array(
        'methods' => array(
            'getDeliveryOrder' => array(
                'len' => 1
            ),
            'getSOpopup' => array(
                'len' => 1
            ),
            'getVEpopup' => array(
                'len' => 1
            ),
            'addDeliveryOrder' => array(
                'len' => 1
            ),
            'addDeliveryOrderReturn' => array(
                'len' => 1
            ),
            'deleteDeliveryOrder' => array(
                'len' => 1
            ),
            'updateDeliveryOrder' => array(
                'len' => 1
            ),
            'updateDeliveryOrderPosting' => array(
                'len' => 1
            ),
            'getDeliveryOrder1' => array(
                'len' => 1
            ),
            'addDeliveryOrder1' => array(
                'len' => 1
            ),
            'deleteDeliveryOrder1' => array(
                'len' => 1
            ),
            'updateDeliveryOrder1' => array(
                'len' => 1
            ),
            'getDOLoc' => array(
                'len' => 1
            ),
            'updateDOLoc' => array(
                'len' => 1
            )

        )
    ),
    'OrderMonitoring' => array(
        'methods' => array(
            'getOrderMonitoring' => array(
                'len' => 1
            )
        )
    ),
    'Popup' => array(
        'methods' => array(
            'SalesOrderPopup' => array(
                'len' => 1
            ),
            'FormulaPopup' => array(
                'len' => 1
            ),
            'GudangPopup' => array(
                'len' => 1
            ),
            'GudangBMPopup' => array(
                'len' => 1
            ),
            'GudangBDPPopup' => array(
                'len' => 1
            ),
            'GudangBJPopup' => array(
                'len' => 1
            ),
            'VendorSuplierPopup' => array(
                'len' => 1
            ),
            'VendorTransporterPopup' => array(
                'len' => 1
            ),
            'ProduksiPopup' => array(
                'len' => 1
            ),
            'POPopup' => array(
                'len' => 1
            ),
            'getGRPopup' => array(
                'len' => 1
            ),
            'getCoaPopup' => array(
                'len' => 1
            ),
            'getAPPayUMpopup' => array(
                'len' => 1
            ),
            'getAP_Invpopup' => array(
                'len' => 1
            ),
            'getAP_InvCancelpopup' => array(
                'len' => 1
            ),
            'getAR_Salepopup' => array(
                'len' => 1
            ),
            'getARCancelpopup' => array(
                'len' => 1
            ),
            'getARPayUMpopup' => array(
                'len' => 1
            ),
            'getAPPaypopup' => array(
                'len' => 1
            ),
            'getAPRCpopup' => array(
                'len' => 1
            ),
            'getAPMnfpopup' => array(
                'len' => 1
            ),
            'getARPaypopup' => array(
                'len' => 1
            ),
            'getDeliveryOrderpopup' => array(
                'len' => 1
            ),
            'getPB0' => array(
                'len' => 1
            ),
            'getTaxKPopup' => array(
                'len' => 1
            ),
            'getTaxMPopup' => array(
                'len' => 1
            ),
            'getCashbonOutPopup' => array(
                'len' => 1
            ),
            'getSODeliveryPopup' => array(
                'len' => 1
            ),
            'getRoutePopup' => array(
                'len' => 1
            ),
            'getReclassOVBpopup' => array(
                'len' => 1
            ),
            'getTaxDokinpopup' => array(
                'len' => 1
            ),
            'getTaxDokoutpopup' => array(
                'len' => 1
            ),
            'getStock_IN_OUTpopup' => array(
                'len' => 1
            ),
            'CFPopup' => array(
                'len' => 1
            ),
            'CF_IPopup' => array(
                'len' => 1
            ),
            'CF_OPopup' => array(
                'len' => 1
            ),
            'PO_rptPopup' => array(
                'len' => 1
            ),
            'getGLADpopup' => array(
                'len' => 1
            ),
            'getKBKpopup' => array(
                'len' => 1
            ),
            'getKBMpopup' => array(
                'len' => 1
            ),
            'SOPPopup' => array(
                'len' => 1
            ),
            'PPDPopup' => array(
                'len' => 1
            ),
            'getPB_rptPopup' => array(
                'len' => 1
            ),
            'GudangBDP_2Popup' => array(
                'len' => 1
            ),
            'getKapal' => array(
                'len' => 1
            ),
            'getSPKirim' => array(
                'len' => 1
            ),
            'getStock_OUTpopup' => array(
                'len' => 1
            ),
            'getAP_Rptpopup' => array(
                'len' => 1
            ),
            'SO_RptPopup' => array(
                'len' => 1
            ),
            'getStockOpname' => array(
                'len' => 1
            ),
            'getStockOpnameBJ' => array(
                'len' => 1
            ),
            'getAR_LPIpopup' => array(
                'len' => 1
            ),
            'getAR_Rptpopup' => array(
                'len' => 1
            ),
            'getARDeduction' => array(
                'len' => 1
            ),
            'getCBPopup' => array(
                'len' => 1
            ),
            'getAPPaymentCancel' => array(
                'len' => 1
            ),
            'getARPaymentCancel' => array(
                'len' => 1
            ),
            'getCB_BankPopup' => array(
                'len' => 1
            ),
            'getStock_Cancelpopup' => array(
                'len' => 1
            )









        )


    ),
    'PengadaanBarang' => array(
        'methods' => array(
            'getPB' => array(
                'len' => 1
            ),
            'addPB' => array(
                'len' => 1
            ),
            'updatePB' => array(
                'len' => 1
            ),
            'deletePB' => array(
                'len' => 1
            ),
            'getPB0' => array(
                'len' => 1
            ),
            'addPB0' => array(
                'len' => 1
            ),
            'updatePB0' => array(
                'len' => 1
            ),
            'deletePB0' => array(
                'len' => 1
            )
        )
    ),
    'Tax' => array(
        'methods' => array(
            'getTax' => array(
                'len' => 1
            ),
            'addTax' => array(
                'len' => 1
            ),
            'updateTax' => array(
                'len' => 1
            ),
            'deleteTax' => array(
                'len' => 1
            )
        )
    ),
    'Bank' => array(
        'methods' => array(
            'getBank' => array(
                'len' => 1
            ),
            'addBank' => array(
                'len' => 1
            ),
            'updateBank' => array(
                'len' => 1
            ),
            'deleteBank' => array(
                'len' => 1
            )
        )
    ),
    'AP_Invoice' => array(
        'methods' => array(
            'getAP_Inv' => array(
                'len' => 1
            ),
            'addAP_Inv' => array(
                'len' => 1
            ),
            'updateAP_Inv' => array(
                'len' => 1
            ),
            'deleteAP_Inv' => array(
                'len' => 1
            ),
            'getAP_Inv_Detail' => array(
                'len' => 1
            ),
            'addAP_Inv_Detail' => array(
                'len' => 1
            ),
            'updateAP_Inv_Detail' => array(
                'len' => 1
            ),
            'deleteAP_Inv_Detail' => array(
                'len' => 1
            ),
            'getAP_Inv_Payment' => array(
                'len' => 1
            ),
            'addAP_Inv_Payment' => array(
                'len' => 1
            ),
            'updateAP_Inv_Payment' => array(
                'len' => 1
            ),
            'deleteAP_Inv_Payment' => array(
                'len' => 1
            ),
            'getAP_Payment_Alocation' => array(
                'len' => 1
            ),
            'getAP_Inv_Manufaktur' => array(
                'len' => 1
            ),
            'addAP_Inv_Manufaktur' => array(
                'len' => 1
            ),
            'updateAP_Inv_Manufaktur' => array(
                'len' => 1
            ),
            'deleteAP_Inv_Manufaktur' => array(
                'len' => 1
            ),
            'addAP_Inv_Detail_Manufaktur' => array(
                'len' => 1
            )/*
            'getAP_Inv_Manufaktur_Revisi' => array(
                'len' => 1
            ),
            'addAP_Inv_Manufaktur_Revisi' => array(
                'len' => 1
            ),
            'addAP_Inv_Detail_Manufaktur_Revisi'=> array(
                'len' => 1
            )*/
        )
    ),
    'AR_Sale' => array(
        'methods' => array(
            'getAR_Sale' => array(
                'len' => 1
            ),
            'getAR_Sale_Detail' => array(
                'len' => 1
            ),
            'addAR_Sale' => array(
                'len' => 1
            ),
            'addAR_Sale_Detail' => array(
                'len' => 1
            ),
            'updateAR_Sale' => array(
                'len' => 1
            ),
            'updateAR_Sale_Detail' => array(
                'len' => 1
            ),
            'deleteAR_Sale' => array(
                'len' => 1
            ),
            'deleteAR_Sale_Detail' => array(
                'len' => 1
            )
        )
    ),
    'AR_Sale_Payment' => array(
        'methods' => array(
            'getAR_Sale_Payment' => array(
                'len' => 1
            ),
            'getAR_Payment_Alocation' => array(
                'len' => 1
            ),
            'addAR_Sale_Payment' => array(
                'len' => 1
            ),
            'updateAR_Sale_Payment' => array(
                'len' => 1
            ),
            'deleteAR_Sale_Payment' => array(
                'len' => 1
            ),
            'getAR_Deduction' => array(
                'len' => 1
            ),
        )
    ),
    'AR_Giro' => array(
        'methods' => array(
            'getAR_Giro' => array(
                'len' => 1
            ),
            'addAR_Giro' => array(
                'len' => 1
            ),
            'updateAR_Giro' => array(
                'len' => 1
            ),
            'deleteAR_Giro' => array(
                'len' => 1
            )
        )
    ),
    'Cashbook_In' => array(
    'methods' => array(
        'getCashbook_In' => array(
            'len' => 1
        ),
        'addCashbook_In' => array(
            'len' => 1
        ),
        'updateCashbook_In' => array(
            'len' => 1
        ),
        'deleteCashbook_In' => array(
            'len' => 1
        ),'getCashbook_In_Detail' => array(
            'len' => 1
        ),
        'addCashbook_In_Detail' => array(
            'len' => 1
        ),
        'updateCashbook_In_Detail' => array(
            'len' => 1
        ),
        'deleteCashbook_In_Detail' => array(
            'len' => 1
        )
    )
),
    'Jurnal' => array(
        'methods' => array(
            'getJurnal' => array(
                'len' => 1
            ),
            'addJurnal' => array(
                'len' => 1
            ),
            'updateJurnal' => array(
                'len' => 1
            ),
            'deleteJurnal' => array(
                'len' => 1
            )
        )
    ),
    'Cashbook_Out' => array(
        'methods' => array(
            'getCashbook_Out' => array(
                'len' => 1
            ),
            'addCashbook_Out' => array(
                'len' => 1
            ),
            'updateCashbook_Out' => array(
                'len' => 1
            ),
            'deleteCashbook_Out' => array(
                'len' => 1
            )
        )
    ),
    'Cashbon_Lebih' => array(
        'methods' => array(
            'getCashbon_Lebih' => array(
                'len' => 1
            ),
            'addCashbon_Lebih' => array(
                'len' => 1
            ),
            'updateCashbon_Lebih' => array(
                'len' => 1
            ),
            'deleteCashbon_Lebih' => array(
                'len' => 1
            )
        )
    ),
    'Cashbon_Kurang' => array(
        'methods' => array(
            'getCashbon_Kurang' => array(
                'len' => 1
            ),
            'addCashbon_Kurang' => array(
                'len' => 1
            ),
            'updateCashbon_Kurang' => array(
                'len' => 1
            ),
            'deleteCashbon_Kurang' => array(
                'len' => 1
            )
        )
    ),
    'Cashbook_Bank_In' => array(
        'methods' => array(
            'getCashbook_Bank_In' => array(
                'len' => 1
            ),
            'addCashbook_Bank_In' => array(
                'len' => 1
            ),
            'updateCashbook_Bank_In' => array(
                'len' => 1
            ),
            'deleteCashbook_Bank_In' => array(
                'len' => 1
            ),'getCashbook_Bank_In_Detail' => array(
                'len' => 1
            ),
            'addCashbook_Bank_In_Detail' => array(
                'len' => 1
            ),
            'updateCashbook_Bank_In_Detail' => array(
                'len' => 1
            ),
            'deleteCashbook_Bank_In_Detail' => array(
                'len' => 1
            )
        )
    ),
    'Cashbook_Bank_Out' => array(
        'methods' => array(
            'getCashbook_Bank_Out' => array(
                'len' => 1
            ),
            'addCashbook_Bank_Out' => array(
                'len' => 1
            ),
            'updateCashbook_Bank_Out' => array(
                'len' => 1
            ),
            'deleteCashbook_Bank_Out' => array(
                'len' => 1
            )
        )
    ),
    'Voucher' => array(
        'methods' => array(
            'getVoucher' => array(
                'len' => 1
            ),
            'addVoucher' => array(
                'len' => 1
            ),
            'updateVoucher' => array(
                'len' => 1
            ),
            'deleteVoucher' => array(
                'len' => 1
            )
        )
    ),
    'Audit_Adjustment' => array(
        'methods' => array(
            'getAudit_Adjustment' => array(
                'len' => 1
            ),
            'addAudit_Adjustment' => array(
                'len' => 1
            ),
            'updateAudit_Adjustment' => array(
                'len' => 1
            ),
            'deleteAudit_Adjustment' => array(
                'len' => 1
            )
        )
    ),

    'CancelReturn' => array(
        'methods' => array(
            'getCancelReturn' => array(
                'len' => 1
            ),
            'addCancelReturn' => array(
                'len' => 1
            ),
            'updateCancelReturn' => array(
                'len' => 1
            ),
            'deleteCancelReturn' => array(
                'len' => 1
            )
        )
    ),
    'Reclass' => array(
        'methods' => array(
            'getViewReclassOVB' => array(
                'len' => 1
            ),
            'addViewReclassOVB' => array(
                'len' => 1
            ),
            'updateCancelReturn' => array(
                'len' => 1
            ),
            'getViewReclassOBJ' => array(
                'len' => 1
            ),
            'addViewReclassOBJ' => array(
                'len' => 1
            ),
        )
    ),
    'AP_Reclass' => array(
        'methods' => array(
            'getReclass' => array(
                'len' => 1
            )
        )
    ),
    'Penyusutan_Aset' => array(
        'methods' => array(
            'getPenyusutan_Aset' => array(
                'len' => 1
            ),
            'addPenyusutan_Aset' => array(
                'len' => 1
            ),
            'updatePenyusutan_Aset' => array(
                'len' => 1
            ),
            'deletePenyusutan_Aset' => array(
                'len' => 1
            )
        )
    ),
    'Acc_Penyusutan_Aset' => array(
        'methods' => array(
            'getAcc_Penyusutan_Aset' => array(
                'len' => 1
            ),
            'addAcc_Penyusutan_Aset' => array(
                'len' => 1
            ),
            'updateAcc_Penyusutan_Aset' => array(
                'len' => 1
            ),
            'deleteAcc_Penyusutan_Aset' => array(
                'len' => 1
            )
        )
    ),
    'Penyusutan_Aset2' => array(
        'methods' => array(
            'getPenyusutan_Aset2' => array(
                'len' => 1
            ),
            'updatePenyusutan_AsetP' => array(
                'len' => 1
            ),
            'updatePenyusutan_Aset2' => array(
                'len' => 1
            )
        )
    ),
    'Jurnal_Penyusutan_Aset' => array(
        'methods' => array(
            'getJurnal_Penyusutan_Aset' => array(
                'len' => 1
            )
        )
    ),
    'Pinjaman_BB_BJ' => array(
        'methods' => array(
            'getPinjam' => array(
                'len' => 1
            ),
            'addPinjam_I' => array(
                'len' => 1
            ),
            'addPinjam_O' => array(
                'len' => 1
            ),'updatePinjam' => array(
                'len' => 1
            ),'deletePinjam' => array(
                'len' => 1
            ),
            'getPinjamDetail' => array(
                'len' => 1
            ),
            'addPinjamDetail' => array(
                'len' => 1
            ),
            'deletePinjamDetail' => array(
                'len' => 1
            ),
            'updatePinjamDetail' => array(
                'len' => 1
            )
        )
    ),
    'Pengembalian_BB_BJ' => array(
    'methods' => array(
        'getPengembalian' => array(
            'len' => 1
        ),
        'getPengembalian_O' => array(
            'len' => 1
        ),
        'addPengembalian_I' => array(
            'len' => 1
        ),
        'addPengembalian_O' => array(
            'len' => 1
        ),'updatePengembalian' => array(
            'len' => 1
        ),'deletePengembalian' => array(
            'len' => 1
        ),
        'getPengembalianDetail' => array(
            'len' => 1
        ),
        'updatePengembalianDetail' => array(
            'len' => 1
        )
    )
),
    'Closing_transaction' => array(
        'methods' => array(
            'getCT_month' => array(
                'len' => 1
            ),
            'addCT_month' => array(
                'len' => 1
            ),
            'updateCT_month' => array(
                'len' => 1
            ),
            'deleteCT_month' => array(
                'len' => 1
            ),'getCT_year' => array(
                'len' => 1
            ),
            'addCT_year' => array(
                'len' => 1
            ),
            'updateCT_year' => array(
                'len' => 1
            ),
            'deleteCT_year' => array(
                'len' => 1
            )
        )
    ),
    'Cashflow' => array(
        'methods' => array(
            'getCashflow' => array(
                'len' => 1
            ),
            'addCashflow' => array(
                'len' => 1
            ),
            'updateCashflow' => array(
                'len' => 1
            ),
            'deleteCashflow' => array(
                'len' => 1
            )
        )
    ),
    'Account' => array(
        'methods' => array(
            'getAccount' => array(
                'len' => 1
            ),
            'addAccount' => array(
                'len' => 1
            ),
            'updateAccount' => array(
                'len' => 1
            ),
            'deleteAccount' => array(
                'len' => 1
            )
        )
    ),
    'WO_BB_Formula' => array(
        'methods' => array(
            'getWO_BB_Formula' => array(
                'len' => 1
            ),
            'addWO_BB_Formula' => array(
                'len' => 1
            ),
            'deleteWO_BB_Formula' => array(
                'len' => 1
            ),
            'getWO_BB_FormulaDetail' => array(
                'len' => 1
            ),
            'addtWO_BB_FormulaDetail' => array(
                'len' => 1
            )
        )
    ),
    'WO_BJ_Formula' => array(
        'methods' => array(
            'getWO_BJ_FormulaDetail' => array(
                'len' => 1
            ),
            'addWO_BJ_FormulaDetail' => array(
                'len' => 1
            ),
            'updateWO_BJ_FormulaDetail' => array(
                'len' => 1
            ),
            'deleteWO_BJ_FormulaDetail' => array(
                'len' => 1
            )
        )
    ),
    'WO_BDP_Formula' => array(
        'methods' => array(
            'getWO_BDP_FormulaDetail' => array(
                'len' => 1
            ),
            'addWO_BDP_FormulaDetail' => array(
                'len' => 1
            ),
            'updateWO_BDP_FormulaDetail' => array(
                'len' => 1
            ),
            'deleteWO_BDP_FormulaDetail' => array(
                'len' => 1
            )
        )
    ),
    'GRN_Return' => array(
        'methods' => array(
            'getGRN_Return' => array(
                'len' => 1
            ),
            'addGRN_Return' => array(
                'len' => 1
            ),
            'updateGRN_Return' => array(
                'len' => 1
            ),
            'updateGRN_Return_Posting' => array(
                'len' => 1
            ),
            'deleteGRN_Return' => array(
                'len' => 1
            )
        )
    ),
    'Jurnal_GRN' => array(
        'methods' => array(
            'getJurnal_GRN' => array(
                'len' => 1
            )
        )
    ),
    'Kapal' => array(
        'methods' => array(
            'getVessel' => array(
                'len' => 1
            ),
            'addVessel' => array(
                'len' => 1
            ),
            'updateVessel' => array(
                'len' => 1
            ),
            'deleteVessel' => array(
                'len' => 1
            )
        )
    ),
    'SP_Kirim' => array(
        'methods' => array(
            'getSP_Kirim' => array(
                'len' => 1
            ),
            'addSP_Kirim' => array(
                'len' => 1
            ),
            'updateSP_Kirim' => array(
                'len' => 1
            ),
            'deleteSP_Kirim' => array(
                'len' => 1
            ),
            'getSP_Kirim_Detail' => array(
                'len' => 1
            ),
            'addSP_Kirim_Detail' => array(
                'len' => 1
            ),
            'updateSP_Kirim_Detail' => array(
                'len' => 1
            ),
            'deleteSP_Kirim_Detail' => array(
                'len' => 1
            )
        )
    ),
    'Formulir' => array(
        'methods' => array(
            'getAnalisaBJ' => array(
                'len' => 1
            ),
            'addAnalisaBJ' => array(
                'len' => 1
            ),
            'updateAnalisaBJ' => array(
                'len' => 1
            ),
            'deleteAnalisaBJ' => array(
                'len' => 1
            ),
            'getAnalisaBB' => array(
                'len' => 1
            ),
            'addAnalisaBB' => array(
                'len' => 1
            ),
            'updateAnalisaBB' => array(
                'len' => 1
            ),
            'deleteAnalisaBB' => array(
                'len' => 1
            ),
            'getAnalisaTB' => array(
                'len' => 1
            ),
            'addAnalisaTB' => array(
                'len' => 1
            ),
            'updateAnalisaTB' => array(
                'len' => 1
            ),
            'deleteAnalisaTB' => array(
                'len' => 1
            )
        )),
    'StockOpname' => array(
        'methods' => array(
            'getStockOpname' => array(
                'len' => 1
            ),
            'addStockOpname' => array(
                'len' => 1
            ),
            'updateStockOpname' => array(
                'len' => 1
            ),
            'deleteStockOpname' => array(
                'len' => 1
            ),
            'getStockOpnameBJ' => array(
                'len' => 1
            ),
            'addStockOpnameBJ' => array(
                'len' => 1
            ),
            'updateStockOpnameBJ' => array(
                'len' => 1
            ),
            'deleteStockOpnameBJ' => array(
                'len' => 1
            )
        )
    ),
    'AR_LatePaymentInterest' => array(
        'methods' => array(
            'getAR_Lpi' => array(
                'len' => 1
            ),
            'addAR_Lpi' => array(
                'len' => 1
            ),
            'updateAR_Lpi' => array(
                'len' => 1
            ),
            'deleteAR_Lpi' => array(
                'len' => 1
            )
        )
    ),
    'WO_BB_Mix' => array(
        'methods' => array(
            'getWO_BJ_Mix' => array(
                'len' => 1
            ),
            'addWO_BJ_Mix' => array(
                'len' => 1
            ),
            'updateWO_BJ_Mix' => array(
                'len' => 1
            ),
            'deleteWO_BJ_Mix' => array(
                'len' => 1
            )
        )
    ),
    'Risk' => array(
        'methods' => array(
            'getRisk' => array(
                'len' => 1
            ),'addRisk' => array(
                'len' => 1
            ),'updateRisk' => array(
                'len' => 1
            ),'deleteRisk' => array(
                'len' => 1
            )
        )
    ),
    'GrnDal' => array(
        'methods' => array(
            'getGrnDal' => array(
                'len' => 1
            ),'addGrnDal' => array(
                'len' => 1
            ),'updateGrnDal' => array(
                'len' => 1
            ),'deleteGrnDal' => array(
                'len' => 1
            ),'getGrnDalDetail' => array(
                'len' => 1
            ),'addGrnDalDetail' => array(
                'len' => 1
            ),'updateGrnDalDetail' => array(
                'len' => 1
            ),'deleteGrnDalDetail' => array(
                'len' => 1
            )
        )
    ),
    'WO_ADL' => array(
        'methods' => array(
            'getWO_ADL' => array(
                'len' => 1
            ),'addWO_ADL' => array(
                'len' => 1
            ),'updateWO_ADL' => array(
                'len' => 1
            ),'deleteWO_ADL' => array(
                'len' => 1
            ),'getWOBB_ADL' => array(
                'len' => 1
            ),'addWOBB_ADL' => array(
                'len' => 1
            ),'updateWOBB_ADL' => array(
                'len' => 1
            ),'deleteWOBB_ADL' => array(
                'len' => 1
            ),'getWOBJM_ADL' => array(
                'len' => 1
            ),'updateWOBJM_ADL' => array(
                'len' => 1
            )
        )
    ),
    'BJ_ADL' => array(
        'methods' => array(
            'getBJ_ADL' => array(
                'len' => 1
            ),'addBJ_ADL' => array(
                'len' => 1
            ),'updateBJ_ADL' => array(
                'len' => 1
            ),'deleteBJ_ADL' => array(
                'len' => 1
            )
        )
    ),
    'Refund' => array(
        'methods' => array(
            'getRefund' => array(
                'len' => 1
            ),'addRefund' => array(
                'len' => 1
            ),'updateRefund' => array(
                'len' => 1
            ),'deleteRefund' => array(
                'len' => 1
            )
        )
    ),
    'WO_SAM' => array(
        'methods' => array(
            'getWO_SAM' => array(
                'len' => 1
            ),'addWO_SAM' => array(
                'len' => 1
            ),'updateWO_SAM' => array(
                'len' => 1
            ),'deleteWO_SAM' => array(
                'len' => 1
            ),'getWOBB_SAM' => array(
                'len' => 1
            ),'addWOBB_SAM' => array(
                'len' => 1
            ),'updateWOBB_SAM' => array(
                'len' => 1
            ),'deleteWOBB_SAM' => array(
                'len' => 1
            ),'getWOBJM_SAM' => array(
                'len' => 1
            ),'updateWOBJM_SAM' => array(
                'len' => 1
            ), 'addWOBBPaket_SAM' => array(
                'len' => 1
            )
        )
    ),
);
