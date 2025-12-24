export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5";
  };
  public: {
    Tables: {
      accounts: {
        Row: {
          bank_code: string | null;
          created_at: string | null;
          currency: Database["public"]["Enums"]["currency_type"];
          current_balance: number | null;
          document_identity: string | null;
          id: string;
          is_active: boolean | null;
          name: string;
          phone_linked: string | null;
        };
        Insert: {
          bank_code?: string | null;
          created_at?: string | null;
          currency: Database["public"]["Enums"]["currency_type"];
          current_balance?: number | null;
          document_identity?: string | null;
          id?: string;
          is_active?: boolean | null;
          name: string;
          phone_linked?: string | null;
        };
        Update: {
          bank_code?: string | null;
          created_at?: string | null;
          currency?: Database["public"]["Enums"]["currency_type"];
          current_balance?: number | null;
          document_identity?: string | null;
          id?: string;
          is_active?: boolean | null;
          name?: string;
          phone_linked?: string | null;
        };
        Relationships: [];
      };
      cash_sessions: {
        Row: {
          closed_at: string | null;
          closing_balance_usd: number | null;
          id: string;
          opened_at: string;
          opening_balance_usd: number | null;
          operator_id: string;
          status: string | null;
        };
        Insert: {
          closed_at?: string | null;
          closing_balance_usd?: number | null;
          id?: string;
          opened_at?: string;
          opening_balance_usd?: number | null;
          operator_id: string;
          status?: string | null;
        };
        Update: {
          closed_at?: string | null;
          closing_balance_usd?: number | null;
          id?: string;
          opened_at?: string;
          opening_balance_usd?: number | null;
          operator_id?: string;
          status?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "cash_sessions_operator_id_fkey";
            columns: ["operator_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      contacts: {
        Row: {
          created_at: string | null;
          full_name: string;
          id: string;
          is_customer: boolean | null;
          is_provider: boolean | null;
          metadata: Json | null;
          phone: string | null;
          tax_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          full_name: string;
          id?: string;
          is_customer?: boolean | null;
          is_provider?: boolean | null;
          metadata?: Json | null;
          phone?: string | null;
          tax_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          full_name?: string;
          id?: string;
          is_customer?: boolean | null;
          is_provider?: boolean | null;
          metadata?: Json | null;
          phone?: string | null;
          tax_id?: string | null;
        };
        Relationships: [];
      };
      current_rates: {
        Row: {
          id: string;
          source: string;
          symbol: string;
          updated_at: string | null;
          value: number;
        };
        Insert: {
          id?: string;
          source: string;
          symbol: string;
          updated_at?: string | null;
          value: number;
        };
        Update: {
          id?: string;
          source?: string;
          symbol?: string;
          updated_at?: string | null;
          value?: number;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          phone: string | null;
          role: Database["public"]["Enums"]["user_role"] | null;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
          phone?: string | null;
          role?: Database["public"]["Enums"]["user_role"] | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          phone?: string | null;
          role?: Database["public"]["Enums"]["user_role"] | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Relationships: [];
      };
      rates_history: {
        Row: {
          created_at: string | null;
          id: number;
          source: string;
          symbol: string;
          value: number;
        };
        Insert: {
          created_at?: string | null;
          id?: never;
          source: string;
          symbol: string;
          value: number;
        };
        Update: {
          created_at?: string | null;
          id?: never;
          source?: string;
          symbol?: string;
          value?: number;
        };
        Relationships: [];
      };
      transaction_evidence: {
        Row: {
          internal_notes: string | null;
          raw_ocr_json: Json | null;
          receipt_url: string | null;
          transaction_id: string;
          verified_at: string | null;
        };
        Insert: {
          internal_notes?: string | null;
          raw_ocr_json?: Json | null;
          receipt_url?: string | null;
          transaction_id: string;
          verified_at?: string | null;
        };
        Update: {
          internal_notes?: string | null;
          raw_ocr_json?: Json | null;
          receipt_url?: string | null;
          transaction_id?: string;
          verified_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "transaction_evidence_transaction_id_fkey";
            columns: ["transaction_id"];
            isOneToOne: true;
            referencedRelation: "transactions";
            referencedColumns: ["id"];
          },
        ];
      };
      transactions: {
        Row: {
          account_id: string;
          amount_native: number;
          amount_usd: number;
          bank_commission_native: number | null;
          contact_id: string | null;
          created_at: string;
          created_by: string | null;
          currency: Database["public"]["Enums"]["currency_type"];
          id: string;
          rate_internal: number;
          reference: string;
          service_fee_usd: number | null;
          session_id: string | null;
          source: Database["public"]["Enums"]["entry_source"];
          status: Database["public"]["Enums"]["transaction_status"] | null;
          type: Database["public"]["Enums"]["transaction_type"];
          verified_by: string | null;
        };
        Insert: {
          account_id: string;
          amount_native: number;
          amount_usd: number;
          bank_commission_native?: number | null;
          contact_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          currency: Database["public"]["Enums"]["currency_type"];
          id?: string;
          rate_internal: number;
          reference: string;
          service_fee_usd?: number | null;
          session_id?: string | null;
          source?: Database["public"]["Enums"]["entry_source"];
          status?: Database["public"]["Enums"]["transaction_status"] | null;
          type: Database["public"]["Enums"]["transaction_type"];
          verified_by?: string | null;
        };
        Update: {
          account_id?: string;
          amount_native?: number;
          amount_usd?: number;
          bank_commission_native?: number | null;
          contact_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          currency?: Database["public"]["Enums"]["currency_type"];
          id?: string;
          rate_internal?: number;
          reference?: string;
          service_fee_usd?: number | null;
          session_id?: string | null;
          source?: Database["public"]["Enums"]["entry_source"];
          status?: Database["public"]["Enums"]["transaction_status"] | null;
          type?: Database["public"]["Enums"]["transaction_type"];
          verified_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "transactions_account_id_fkey";
            columns: ["account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "transactions_contact_id_fkey";
            columns: ["contact_id"];
            isOneToOne: false;
            referencedRelation: "contacts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "transactions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "transactions_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "cash_sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "transactions_verified_by_fkey";
            columns: ["verified_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      v_account_balances_summary: {
        Row: {
          account_name: string | null;
          balance_in_usd: number | null;
          currency: Database["public"]["Enums"]["currency_type"] | null;
          current_balance: number | null;
        };
        Insert: {
          account_name?: string | null;
          balance_in_usd?: never;
          currency?: Database["public"]["Enums"]["currency_type"] | null;
          current_balance?: number | null;
        };
        Update: {
          account_name?: string | null;
          balance_in_usd?: never;
          currency?: Database["public"]["Enums"]["currency_type"] | null;
          current_balance?: number | null;
        };
        Relationships: [];
      };
      v_monthly_revenue: {
        Row: {
          day: string | null;
          expenses_usd: number | null;
          revenue_usd: number | null;
          transaction_count: number | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      get_dashboard_stats: {
        Args: { end_date?: string; start_date?: string };
        Returns: {
          completed_count: number;
          pending_count: number;
          total_profit: number;
          total_transactions: number;
          total_volume: number;
        }[];
      };
      get_my_role: {
        Args: never;
        Returns: Database["public"]["Enums"]["user_role"];
      };
    };
    Enums: {
      currency_code: "VES" | "USD" | "EUR" | "USDT" | "OTRO";
      currency_type: "VES" | "USD";
      entry_source: "manual" | "bot" | "ocr";
      financial_platform:
        | "BANESCO_VE"
        | "MERCANTIL_VE"
        | "PAGO_MOVIL"
        | "ZELLE"
        | "PAYPAL"
        | "BINANCE"
        | "EFECTIVO"
        | "CUENTA_PROPIA"
        | "BOFA"
        | "WELLS_FARGO"
        | "OTRO";
      transaction_status: "pending" | "completed" | "voided";
      transaction_type: "income" | "expense";
      user_role: "ADMIN" | "DEV" | "OPERATOR";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      currency_code: ["VES", "USD", "EUR", "USDT", "OTRO"],
      currency_type: ["VES", "USD"],
      entry_source: ["manual", "bot", "ocr"],
      financial_platform: [
        "BANESCO_VE",
        "MERCANTIL_VE",
        "PAGO_MOVIL",
        "ZELLE",
        "PAYPAL",
        "BINANCE",
        "EFECTIVO",
        "CUENTA_PROPIA",
        "BOFA",
        "WELLS_FARGO",
        "OTRO",
      ],
      transaction_status: ["pending", "completed", "voided"],
      transaction_type: ["income", "expense"],
      user_role: ["ADMIN", "DEV", "OPERATOR"],
    },
  },
} as const;
