export interface BrideSubcategory {
  key: string;
  label: string;
  icon: string;
  content: string;
}

export interface BrideDetail {
  id: string;
  name: string;
  subcategories: BrideSubcategory[];
}

export const mockBrideDetails: Record<string, BrideDetail> = {
  "b1": {
    id: "b1",
    name: "Ashley Thomas",
    subcategories: [
      {
        key: "measurements",
        label: "Measurements",
        icon: "📏",
        content: "Bust: 34\", Waist: 28\", Hips: 36\", Height: 5'6\""
      },
      {
        key: "colorPalette",
        label: "Color Palette",
        icon: "🎨",
        content: "Primary: Dusty Rose, Accent: Sage Green, Neutral: Ivory"
      },
      {
        key: "dressElements",
        label: "Dress Elements",
        icon: "✂️",
        content: "Neckline: V-neck, Sleeves: Cap sleeves, Skirt: A-line, Train: Chapel length"
      },
      {
        key: "inspoCollection",
        label: "Inspo Collection",
        icon: "🖼️",
        content: "12 saved inspiration images from Pinterest and magazines"
      },
      {
        key: "notes",
        label: "Notes",
        icon: "📝",
        content: "Loves lace details, prefers natural fabrics, budget: $3,000"
      },
      {
        key: "referencedInspo",
        label: "Referenced Inspo",
        icon: "🔗",
        content: "3 linked inspiration boards from other brides"
      }
    ]
  },
  "b2": {
    id: "b2",
    name: "Seraphina Vale",
    subcategories: [
      {
        key: "measurements",
        label: "Measurements",
        icon: "📏",
        content: "Bust: 32\", Waist: 26\", Hips: 34\", Height: 5'4\""
      },
      {
        key: "colorPalette",
        label: "Color Palette",
        icon: "🎨",
        content: "Primary: Navy Blue, Accent: Gold, Neutral: White"
      },
      {
        key: "dressElements",
        label: "Dress Elements",
        icon: "✂️",
        content: "Neckline: Sweetheart, Sleeves: Long lace, Skirt: Ballgown, Train: Cathedral"
      },
      {
        key: "inspoCollection",
        label: "Inspo Collection",
        icon: "🖼️",
        content: "8 saved inspiration images from bridal shows"
      },
      {
        key: "notes",
        label: "Notes",
        icon: "📝",
        content: "Classic romantic style, wants sparkle, budget: $4,500"
      },
      {
        key: "referencedInspo",
        label: "Referenced Inspo",
        icon: "🔗",
        content: "2 linked inspiration boards from designers"
      }
    ]
  },
  "b3": {
    id: "b3",
    name: "Lysandra Croft",
    subcategories: [
      {
        key: "measurements",
        label: "Measurements",
        icon: "📏",
        content: "Bust: 33\", Waist: 27\", Hips: 35\", Height: 5'5\""
      },
      {
        key: "colorPalette",
        label: "Color Palette",
        icon: "🎨",
        content: "Primary: Blush Pink, Accent: Silver, Neutral: White"
      },
      {
        key: "dressElements",
        label: "Dress Elements",
        icon: "✂️",
        content: "Neckline: Strapless, Sleeves: None, Skirt: Mermaid, Train: Sweep"
      },
      {
        key: "inspoCollection",
        label: "Inspo Collection",
        icon: "🖼️",
        content: "15 saved inspiration images from social media"
      },
      {
        key: "notes",
        label: "Notes",
        icon: "📝",
        content: "Modern minimalist style, loves clean lines, budget: $3,800"
      },
      {
        key: "referencedInspo",
        label: "Referenced Inspo",
        icon: "🔗",
        content: "1 linked inspiration board from designer"
      }
    ]
  },
  "b4": {
    id: "b4",
    name: "Clara Lopez",
    subcategories: [
      {
        key: "measurements",
        label: "Measurements",
        icon: "📏",
        content: "Bust: 35\", Waist: 29\", Hips: 37\", Height: 5'7\""
      },
      {
        key: "colorPalette",
        label: "Color Palette",
        icon: "🎨",
        content: "Primary: Burgundy, Accent: Gold, Neutral: Cream"
      },
      {
        key: "dressElements",
        label: "Dress Elements",
        icon: "✂️",
        content: "Neckline: Off-shoulder, Sleeves: Bell sleeves, Skirt: Ballgown, Train: Cathedral"
      },
      {
        key: "inspoCollection",
        label: "Inspo Collection",
        icon: "🖼️",
        content: "20 saved inspiration images from magazines"
      },
      {
        key: "notes",
        label: "Notes",
        icon: "📝",
        content: "Romantic vintage style, loves floral details, budget: $5,200"
      },
      {
        key: "referencedInspo",
        label: "Referenced Inspo",
        icon: "🔗",
        content: "4 linked inspiration boards from other brides"
      }
    ]
  }
}; 