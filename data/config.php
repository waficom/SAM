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
            'getbbLiveSearch' => array(
                'len' => 1
            ),
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
            'getKemasanLiveSearch' => array(
                'len' => 1
            ),
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
            'getJenisLiveSearch' => array(
                'len' => 1
            ),
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
            'getSatuanLiveSearch' => array(
                'len' => 1
            ),
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
            'getItemsLiveSearch' => array(
                'len' => 1
            ),
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
            )
        )
    ),
    /**
     * Customer Functions
     */
    'Customer' => array(
        'methods' => array(
            'getCustLiveSearch' => array(
                'len' => 1
            ),
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
            )
        )
    ),
    /**
     * spesifikasi Functions
     */
    'Spesifikasi' => array(
        'methods' => array(
            'getSpesifikasiLiveSearch' => array(
                'len' => 1
            ),
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
            'getVendorLiveSearch' => array(
                'len' => 1
            ),
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
            'getBentukLiveSearch' => array(
                'len' => 1
            ),
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
            'getFormulaLiveSearch' => array(
                'len' => 1
            ),
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
            'getSalesmanLiveSearch' => array(
                'len' => 1
            ),
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
            'getWilayahLiveSearch' => array(
                'len' => 1
            ),
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
            'deletebypo_num' => array(
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
    )

	
);
